import React from "react";
import Feed from "../../components/Feed";
import HeaderComponent from "../../components/HeaderComponent";
import NotificationFeed from "../../components/NotificationFeed";
import Rightbar from "../../components/Rightbar";
import RightbarGroup from "../../components/RightbarGroup.jsx";
import Sidebar from "../../components/Sidebar";
import "./Notifications.css";
import RightbarHome from "../../components/RightbarHome";
import { SideNaveBar } from "../../components/SideNavbar/SideNavebar";

export default function Notifications() {
  return (
    <>
      <HeaderComponent />
      <div className="profile  mt-3">
        <SideNaveBar />
        {/* <Sidebar /> */}
        <NotificationFeed />

        <RightbarHome />
      </div>
    </>
  );
}
