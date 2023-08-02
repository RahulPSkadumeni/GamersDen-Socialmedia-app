import React from "react";
import "./GroupPages.css";
import HeaderComponent from "../../components/HeaderComponent";
import Sidebar from "../../components/Sidebar";

import RightbarHome from "../../components/RightbarHome";
import SearchFeed from "../../components/SearchFeed";
import { SideNaveBar } from "../../components/SideNavbar/SideNavebar";
import Head from "../../components/Head";

export default function GroupPages() {
  return (
    <div>
      <Head />

      <div className="profile bg-gray-400">
        <SideNaveBar />
        <SearchFeed />
        <RightbarHome />
      </div>
    </div>
  );
}
