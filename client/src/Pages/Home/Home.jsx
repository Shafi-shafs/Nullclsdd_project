import React from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar.jsx";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid.jsx";
import "./Home.css";
function Home() {

  const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q).reverse();
  
  const NavList = [
    "All",
    "Iron Man",
    "Ben Ten",
    "React",
    "Ardino",
    "Prabhas",
    "Animation",
    "Gaming",
    "Comedy",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Devloper",
    
  ];
  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {NavList.map((m) => {
            return (
              <p key={m} className="btn_nav_home">
                {m}
              </p>
            );
          })}
        </div>
        <ShowVideoGrid vids={vids} />
      </div>
    </div>
  );
}

export default Home;
