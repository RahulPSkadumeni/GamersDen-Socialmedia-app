import React from "react";
import Feed from "../../components/Feed";
import GroupFeed from "../../components/GroupFeed";
import HeaderComponent from "../../components/HeaderComponent";
import ProfileComponent from "../../components/ProfileComponent";
import Rightbar from "../../components/Rightbar";

import Sidebar from "../../components/Sidebar";
import GroupRightbar from "./GroupRightbar";
import axios from "axios";
import "./Profilepage.css";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../utils/axios";
import { SideNaveBar } from "../../components/SideNavbar/SideNavebar";
import RightbarHome from "../../components/RightbarHome";
const GroupHome = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [groupPost, setGroupPost] = useState([]);
  console.log("????????????", group);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    try {
      console.log(">>>>>>>>>>>>>>>>>>>>LLLLLLLLLLLLLLLLLLLL");
      fetchGroup();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchGroup = async () => {
    // console.log(groupId);
    let res = await Axios.get(`/group/groupDetails/${groupId}/`);
    console.log("group is>>>>>>>>>>>>>>>>>>>>>>>>>>>", res.data.groupName);
    setGroup(res.data);
    // console.log("group", group);
  };

  const leaveGroup = async (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to leave  this community?"
    );
    if (confirmDelete) {
      console.log("groupId>>>>>>>>>>_______>>>>>", groupId);
      let res = await Axios.post(`group/leave/${groupId}`, {
        userId: user._id,
      });

      console.log(res);
      navigate("/");
    }
  };

  return (
    <div>
      <HeaderComponent />
      <div className="profile">
        <SideNaveBar />

        <ProfileComponent />

        <div>
          <div className="profileRight">
            {/* <div className="profileRightTop">
              <div className="profileCover">
                <button
                  className="bg-red-900 rounded-full p-3 mt-20 text-white absolute top-0 right-0 m-3"
                  onClick={leaveGroup}
                >
                  Leave
                </button>
                <img
                  className="profileCoverImage"
                  src="https://www.fbcoverlover.com/covers/mortal-kombat-2-Facebook-Cover.jpg?i"
                  alt="coverImg"
                />

                <img
                  className="profileUserImage"
                  src={group?.avatar}
                  alt="profileAvatar"
                />
              </div>
              <div className="profileInfo">
                <h4></h4>
                <div className="status"></div>
                <h className="text-black mt-5 font-bold pt-10">
                  {group?.groupName}
                </h>
                <p className="text-black mt-5">{group?.description}</p>
              </div>
            </div> */}
            <div className="profileRightBottom">
              <GroupFeed />
            </div>
          </div>
        </div>
        <RightbarHome />
      </div>
    </div>
  );
};

export default GroupHome;
