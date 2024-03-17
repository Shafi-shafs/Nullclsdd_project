import axios from "axios";
import { useEffect } from "react";

const API = axios.create({ baseURL: `https://nullclass-back.onrender.com/` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const login = (authData) => API.post("/user/login", authData);
export const updateChanelData = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
export const fetchAllChanel = () => API.get("/user/getAllChanels");

export const uploadVideo = (fileData, fileOptions) =>
  API.post("/video/uploadVideo", fileData, fileOptions);
export const getVideos = () => API.get("/video/getvideos");
export const likeVideo = (id, Like) => API.patch(`/video/like/${id}`, { Like });
export const viewsVideo = (id) => API.patch(`/video/view/${id}`);

export const addToLikedVideo = (likedVideoData) =>
  API.post("/video/likeVideo", likedVideoData);
export const getAlllikedVideo = () => API.get("/video/getAlllikeVideo");
export const deletelikedVideo = (videoId, Viewer) =>
  API.delete(`/video/deleteLikedVideo/${videoId}/${Viewer}`);

export const addTowatchLater = (watchLaterData) =>
  API.post("/video/watchLater", watchLaterData);
export const getAllwatchLater = () => API.get("/video/getAllwatchLater");
export const deleteWatchLater = (videoId, Viewer) =>
  API.delete(`/video/deleteWatchlater/${videoId}/${Viewer}`);

export const addToHistory = (HistoryData) =>
  API.post("/video/History", HistoryData);
export const getAllHistory = () => API.get("/video/getAllHistory");
export const deleteHistory = (userId) =>
  API.delete(`/video/deleteHistory/${userId}`);

export const postComment = (CommentData) => API.post('/comment/post', CommentData);
export const deleteComment = (id) => API.delete(`/comment/delete/${id}`);
export const editComment = (id, commentBody) => API.patch(`/comment/edit/${id}`, { commentBody });
export const getAllComment = () => API.get('/comment/get');

export const useFetchDataEveryThreeSeconds = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getVideos(),
          getAlllikedVideo(),
          getAllwatchLater(),
          getAllHistory(),
          getAllComment()
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 3000);

    return () => clearInterval(intervalId);
  }, []);
};
