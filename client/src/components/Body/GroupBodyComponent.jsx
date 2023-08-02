import React from "react";
import { useSelector } from "react-redux";
import Feed from "../Feed";
import Rightbar from "../Rightbar";
import RightbarHome from "../RightbarHome";

// import Rightbar from '../Rightbars'
import Sidebar from "../Sidebar";
import "./BodyComponent.css";
import NavigationCard from "../share/NavigationCard/NavigationCard";
import { SideNaveBar } from "../SideNavbar/SideNavebar";

const BodyComponent = () => {
  const user = useSelector((state) => state.user);

  let owner = true;
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <SideNaveBar />

      <RightbarHome />
    </div>
  );
};

export default BodyComponent;
