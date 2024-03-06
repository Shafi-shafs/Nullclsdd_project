import React from "react";
import Home from "../Pages/Home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Library from "../Pages/Library/Library.jsx";
import YourVideo from "../Pages/YourVideo/YourVideo.jsx";
import WatchHistory from "../Pages/WatchHistory/WatchHistory.jsx";
import WatchLater from "../Pages/WatchLater/WatchLater.jsx";
import LikedVideo from "../Pages/LikedVideo/LikedVideo.jsx";
import VideoPage from "../Pages/VideoPage/VideoPage.jsx";
import Chanel from "../Pages/Chanel/Chanel.jsx";
import Search from "../Pages/Search/Search.jsx";
function AllRoutes({ setEditCreateChanelBtn,setVidUploadPage }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/history" element={<WatchHistory />} />
      <Route path="/watchlater" element={<WatchLater />} />
      <Route path="/likedvideo" element={<LikedVideo />} />
      <Route path="/yourvideos" element={<YourVideo />} />
      <Route path="/videopage/:vid" element={<VideoPage />} />
      <Route path="/seacrh/:searchQuery" element={<Search />} />
      <Route
        path="/chanel/:Cid"
        element={<Chanel 
          setVidUploadPage={setVidUploadPage}
          setEditCreateChanelBtn={setEditCreateChanelBtn} />}
      />
    </Routes>
  );
}

export default AllRoutes;
