import React, { useState } from "react";
import FriendsCard from "./friendsCard/FriendsCard";
import FriendsList from "./friendslist/FriendsList";
import FriendsRequestCard from "./friendsRequestCard/FriendsRequestCard";
import Profile from "./ProfileCard/Profile";
import { BsInboxesFill } from "react-icons/bs";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import "./Rightbar.css";

export default function RightbarHome({ profile }) {
  const [sidebarShow, setSidebarShow] = useState(true);

  const toggleSidebar = () => {
    setSidebarShow(!sidebarShow);
  };
  const HomeRightBar = () => {
    return (
      // <>
      //   <h1></h1>
      //   <Profile />
      //   <h4 className="rightbarTitle">Online Friends</h4>

      //   <FriendsCard className="rightbarFriendList" />
      // </>
      <>
        <div
          className={
            sidebarShow
              ? "w-[-20rem] h-screen rounded-lg bg-gray-200 dark:bg-[#161819] shadow-xl duration-200"
              : "w-24 h-screen rounded-lg bg-gray-200 dark:bg-[#161819] shadow-xl duration-200"
          }
        >
          <div className="space-y-6 p-5">
            <div className="relative flex items-center">
              <div className="flex items-center justify-center rounded-2xl border-2 border-gray-300 dark:border-transparent bg-transparent dark:bg-[#242627] w-fit p-1">
                {/* <img
                  className="rounded-full w-10 h-10 object-contain"
                  // src={Your-Avatar}
                  src={profile?.picturePath}
                  alt="avatar img"
                /> */}
              </div>
              <div className={sidebarShow ? "relative ml-4" : "hidden"}>
                <h2 className="text-[#242627] dark:text-gray-50 font-semibold text-lg">
                  {profile?.firstName} {profile?.lastName}
                </h2>
                {/* <span className="absolute -top-0.5 -right-2 w-2 h-2 rounded-full bg-[#6fce97]" /> */}
              </div>
              <div
                onClick={toggleSidebar}
                className={
                  sidebarShow
                    ? closeAndOpenDefaultClass + "-right-5  rounded-l-lg"
                    : closeAndOpenDefaultClass + "-right-10  rounded-r-lg"
                }
              >
                {sidebarShow ? <IoIosArrowBack /> : <IoIosArrowForward />}
              </div>
            </div>
            <ProfileRightBar />
            <h4>User Friends</h4>
            <h4 className="rightbarTitle">Online Friends</h4>

            <FriendsCard className="rightbarFriendList" />
          </div>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <div>
        <Profile />
        <h1 className="RIghtbarTitle">User Information Title </h1>
        <div className="Rightbarinfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">City:</span>
            <span className="rightbarInfoValue">Ernakulam:</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">From:</span>
            <span className="rightbarInfoValue">Kannur</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfokey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>

        <h4>User Friends</h4>
        <FriendsList />
      </div>
    );
  };
  const closeAndOpenDefaultClass =
    "absolute px-0.5 py-3 bg-[#C5C4C0] dark:bg-[#323435] text-[#161925] dark:text-white cursor-pointer ";
  return <HomeRightBar />;
}
