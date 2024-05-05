import jwt from "jsonwebtoken";
import users from '../models/auth.js';

const MAX_FAILED_LOGIN_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 5 * 60 * 1000; // 5 minutes in milliseconds

export const login = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    
    try {
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            // User not found
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if the account is currently blocked
        if (existingUser.blockedUntil && existingUser.blockedUntil > new Date()) {
            // Account is blocked
            return res.status(403).json({ message: 'Account is blocked' });
        }

        if (existingUser.failedLoginAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
            // Account reached the maximum failed login attempts
            existingUser.blockedUntil = new Date(Date.now() + BLOCK_DURATION_MS);
            await existingUser.save();
            // Send email notification about the account being blocked
            sendBlockNotificationEmail(existingUser.email);
            return res.status(403).json({ message: 'Account is blocked' });
        }

        // At this point, the user exists and is not currently blocked
        const token = jwt.sign({
            email: existingUser.email, id: existingUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong...' });
    }
};

// Function to handle failed login attempts
async function handleFailedLoginAttempt(user) {
    user.failedLoginAttempts += 1;
    await user.save();
}

// Function to reset failed login attempts
async function resetFailedLoginAttempts(user) {
    user.failedLoginAttempts = 0;
    await user.save();
}

// Send email notification about account being blocked
function sendBlockNotificationEmail(email) {
    // Implement email notification logic here
}
