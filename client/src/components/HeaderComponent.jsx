import React, { useState, useEffect } from "react";
import Logo from "./Logo/Logo";
import "./HeaderComponent.css";
import { FaSearch } from "react-icons/fa";
import {
  IoSettingsSharp,
  IoNotificationsSharp,
  IoLogOutSharp,
} from "react-icons/io5";
import { BsChatRight } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { setLogout } from "../pages/state";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { filterUser } from "../api/filterApi/filterapi";
import { fetchAllUsers } from "../api/usersApi/user";
import FriendsCard from "./friendsCard/FriendsCard";
import { Link, Navigate } from "react-router-dom";
import { fetchAllPost } from "../api/postApi/post";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/axios";
import { TypeA } from "./Logout/Logout";

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const [filteredUser, setFilteredUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [NotificationCount, setNotificationCount] = useState(null);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  console.log(user);
  useEffect(() => {
    const fetchNotification = async () => {
      console.log("token", token);
      const data = await Axios.post(`/notification/all`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data.length);
      setNotificationCount(data.data.length);
    };
    fetchNotification();
  }, []);

  const getAllUsers = () => {
    fetchAllUsers().then((result) => {
      // setFilteredUser(result);
      setAllUser(result);
    });
  };

  let allData = allUser.concat(...allPost);
  console.log("allData", allData);

  const handleSearch = async (searchTerm) => {
    if (searchTerm !== "") {
      const { data } = await Axios.post("search/searchAll", {
        searchTerm: searchTerm,
      });
      console.log(data);
      navigate("/SearchResult", { state: { data } });
    }
  };
  const clearSearch = () => {
    setFilteredUser(null);
  };

  return (
    <>
      <div className="header sticky bg-white dark:bg-gray-800 shadow-md py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-1/5">
            <Logo />
          </div>
          <div className="topbarCenter flex-grow">
            <div className="searchbar relative">
              <FaSearch className="searchIcon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                value={searchTerm}
                placeholder="   Search for post, friends, any videos..."
                className="searchInput pl-10 pr-4 py-1 w-full text-md rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  handleSearch(searchTerm);
                }}
                className="bg-indigo-600 text-white px-4 py-1 rounded-md ml-2 focus:outline-none hover:bg-indigo-700 absolute right-0"
              >
                Search
              </button>
              <div className="pt-80 mr-60 pr-10"></div>
            </div>
          </div>
          <div className="topbarRight flex items-center">
            <div className="topbarIcons">
              <div className="topbarIconItem relative mr-3">
                <IoSettingsSharp size={"1.3rem"} className="text-gray-600" />
                <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="topbarIconItem relative mr-3">
                <BsChatRight className="text-gray-600" />
                <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="topbarIconItem relative mr-3">
                <IoNotificationsSharp className="text-gray-600" />
                <span className="topbarIconBadge absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {NotificationCount}
                </span>
              </div>
              <div className="topbarIconItem">
                {/* <AiOutlineLogout
                  onClick={() => dispatch(setLogout())}
                  className="text-gray-100"
                /> */}
                <TypeA />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
