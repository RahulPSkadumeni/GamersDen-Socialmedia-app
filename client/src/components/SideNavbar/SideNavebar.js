import React, { useEffect, useState } from "react";
// import Your-Avatar from './avatar-path';
import { BiSearch } from "react-icons/bi";
import {
  BsBasket2Fill,
  BsCompassFill,
  BsFillStarFill,
  BsFolderFill,
  BsInboxesFill,
  BsPlusCircleFill,
} from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDashboardCustomize, MdSavings } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/baseurl";
import { MdHome } from "react-icons/md";
import { RiCommunityFill, RiInboxArchiveFill } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import SuggestedUsers from "../friendsSuggesition/SuggestedUsers";
import axios from "axios";

export const SideNaveBar = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  const [sidebarShow, setSidebarShow] = useState(true);

  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);
  console.log("user?????", user);

  const navigate = useNavigate();
  // const token = useSelector((state) => state.token);

  // const userId = user._id;

  // const getUser = async () => {
  //   const response = await fetch(BASE_URL + `/users/${userId}`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   console.log(">>profile>>", data);

  //   setProfile(data);
  //   console.log(profile);
  // };

  const toggleSidebar = () => {
    setSidebarShow(!sidebarShow);
  };
  useEffect(() => {
    const fetchNotification = async () => {
      console.log("token", token);
      const data = await axios.post(`/api/notification/unread`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.length);
      setNotificationCount(data.data.length);
    };
    fetchNotification();
  }, []);

  // const [profile, setProfile] = useState(null);
  // const user = useSelector((state) => state.user);

  // const navigate = useNavigate;
  const token = useSelector((state) => state.token);

  const userId = user._id;

  const getUser = async () => {
    const response = await fetch(BASE_URL + `/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(">>profile>>", data);

    setProfile(data);
    console.log(profile);
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log("????????????????", profile);
  if (!user) {
    return null;
  }

  if (!profile) {
    return null;
  }
  const {
    firstName,
    lastName,
    userName,
    location,
    occupation,
    phoneNumber,
    friends,
  } = profile;

  const closeAndOpenDefaultClass =
    "absolute px-0.5 py-3 bg-[#C5C4C0] dark:bg-[#323435] text-[#161925] dark:text-white cursor-pointer ";

  const listTextDefaultClass =
    "text-gray-700 group-hover:text-white dark:text-white font-semibold ml-4 ";

  return (
    <>
      <div
        className={
          sidebarShow
            ? "w-[20rem] h-screen rounded-lg bg-gray-200 dark:bg-[#161819] shadow-xl duration-200"
            : "w-24 h-screen rounded-lg bg-gray-200 dark:bg-[#161819] shadow-xl duration-200"
        }
      >
        <div className="flex items-center space-x-2 p-2">
          <span className="w-2 h-2 rounded-full bg-[#ee6a5e]" />
          <span className="w-2 h-2 rounded-full bg-[#f4bd4f]" />
          <span className="w-2 h-2 rounded-full bg-[#60c455]" />
        </div>
        <div className="space-y-6 p-5">
          <div className="relative flex items-center">
            <div className="flex items-center justify-center rounded-2xl border-2 border-gray-300 dark:border-transparent bg-transparent dark:bg-[#242627] w-fit p-1">
              <img
                className="rounded-full w-10 h-10 object-contain"
                // src={Your-Avatar}
                src={profile?.picturePath}
                alt="avatar img"
              />
            </div>
            <div className={sidebarShow ? "relative ml-4" : "hidden"}>
              <h2 className="text-[#242627] dark:text-white font-semibold text-lg">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <span className="absolute -top-0.5 -right-2 w-2 h-2 rounded-full bg-[#6fce97]" />
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
          <div className="flex items-center rounded-lg bg-[#f2f3f7] dark:bg-[#252728] px-4 py-2 md:py-3">
            <BiSearch
              className={
                sidebarShow
                  ? "text-xl text-[#252728] dark:text-gray-200"
                  : "mx-auto"
              }
            />
            <input
              className={
                sidebarShow
                  ? "flex flex-grow bg-transparent outline-none px-2 text-sm"
                  : "hidden"
              }
              type="text"
              placeholder="Keyword"
            />
            <BsFillStarFill
              className={sidebarShow ? "text-yellow-300" : "hidden"}
            />
          </div>
          <div className="px-1">
            <small className="text-xs font-medium text-[#161925] dark:text-gray-500 uppercase py-2">
              Overview
            </small>
            <div>
              <div
                className="flex items-center dark:text-white p-3 rounded-xl cursor-default hover:bg-[#3f8dfd] group"
                onClick={() => {
                  navigate("/");
                }}
              >
                <MdHome className="text-2xl group-hover:text-white text-gray-500" />
                <button
                  className={sidebarShow ? listTextDefaultClass : "hidden"}
                >
                  Home
                </button>
              </div>
              <div className="flex items-center dark:text-white p-3 rounded-xl cursor-default hover:bg-[#3f8dfd] group">
                <RiCommunityFill className="text-2xl group-hover:text-white text-gray-500" />
                <h1
                  className={sidebarShow ? listTextDefaultClass : "hidden"}
                  onClick={() => {
                    navigate("/groups");
                  }}
                >
                  Community
                </h1>
              </div>
              {/* <div className="flex items-center dark:text-white p-3 rounded-xl cursor-default hover:bg-[#3f8dfd] group">
                <BsCompassFill className="text-2xl group-hover:text-white text-gray-500" />
                <h1 className={sidebarShow ? listTextDefaultClass : "hidden"}>
                  Feed
                </h1>
              </div> */}
              <div className="flex items-center dark:text-white p-3 rounded-xl cursor-default hover:bg-[#3f8dfd] group">
                <BsInboxesFill className="text-2xl group-hover:text-white text-gray-500" />
                <h1
                  className={sidebarShow ? listTextDefaultClass : "hidden"}
                  onClick={() => {
                    navigate("/chat");
                  }}
                >
                  Inbox
                </h1>
              </div>
              <div className="flex items-center dark:text-white p-3 rounded-xl cursor-default hover:bg-[#3f8dfd] group">
                <IoNotificationsSharp className="text-2xl group-hover:text-white text-gray-500" />{" "}
                {NotificationCount}
                <span className="topbarIconBadge absolute top-0 right-0 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"></span>{" "}
                <h1 className={sidebarShow ? listTextDefaultClass : "hidden"}>
                  Notifications
                </h1>
                {NotificationCount > 0 && (
                  <p className="ml-3 bg-red-500 p-2 text-white rounded-full">
                    {NotificationCount}
                  </p>
                )}
              </div>
              <div className="flex items-center dark:text-white p-3 rounded-xl cursor-default hover:bg-[#3f8dfd] group">
                <BsBasket2Fill className="text-2xl group-hover:text-white text-gray-500" />
                <h1 className={sidebarShow ? listTextDefaultClass : "hidden"}>
                  Sales
                </h1>
              </div>
            </div>
          </div>
          <div className="px-1">
            <small className="text-xs font-medium text-[#161925] dark:text-gray-500 uppercase py-2 truncate">
              Add new
            </small>
          </div>
          <ul className="p-4 ml-4 text-black-200 ">
            Suggested Users
            <SuggestedUsers />
          </ul>
          <div></div>
          {/* <div className="flex flex-col items-center justify-center cursor-pointer border hover:border-gray-500 hover:dark:border-white py-4 rounded-lg bg-[#f2f3f7] dark:bg-[#323435]">
            <BsPlusCircleFill className="text-[#3f8dfd] text-3xl bg-white rounded-full shadow-xl" />
            <small
              className={
                sidebarShow
                  ? "font-semibold text-gray-500 dark:text-white py-2"
                  : "hidden"
              }
            >
              Add new Project
              
            </small>
            
          </div> */}
        </div>
      </div>
    </>
  );
};
