import React, { useEffect, useState } from 'react';
import ShowVideo from '../ShowVideo/ShowVideo';
import './ShowVideoGrid.css';
import { io } from 'socket.io-client';

function ShowVideoGrid() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    fetchVideos();
    const socket = io('https://nullclass-back.onrender.com/');
    // const socket = io('https://http://localhost:5500/');

    socket.on('newVideo', (newVideo) => {
      
      fetchVideos();
    });

    const pollingInterval = setInterval(fetchVideos, 2000);

    return () => {
      socket.disconnect();
      clearInterval(pollingInterval);
    };
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('https://nullclass-back.onrender.com/video/getvideos');
      // const response = await fetch('http://localhost:5500/video/getvideos');

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div className='Container_ShowVideoGrid'>
      {videos.map((video) => (
        <div key={video._id} className='video_box_app'>
          <ShowVideo vid={video} />
        </div>
      ))}
    </div>
  );
}

export default ShowVideoGrid;
