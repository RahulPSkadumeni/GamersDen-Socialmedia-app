import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiInboxArchiveFill, RiCommunityFill } from "react-icons/ri";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import "./sidebar.css";
import { useState } from "react";
import SuggestedUsers from "./friendsSuggesition/SuggestedUsers";
import MenuComponent from "./MenuComponent/MenuComponent";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, SetOpen] = useState(true);

  return (
    <div className={`  mr-4   h-full top-0  ${open ? "w - 72" : "w - 20"} `}>
      <MenuComponent />
    </div>
  );
};

export default Sidebar;
