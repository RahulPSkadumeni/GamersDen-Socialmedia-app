import React, { useEffect, useState } from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";
import { Posts } from "./dummyData";
import Banner from "./Banner/Banner";
import SingleNotification from "./Post/SingleNotification";
import { useSelector } from "react-redux";
import axios from "axios";
import Axios from "../utils/axios";

const NotificationFeed = () => {
  const token = useSelector((state) => state.token);
  const [Notifications, setNotifications] = useState(null);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setTimeout(() => {
      markAllNotificationsAsRead();
    }, 4000);
  });
  const markAllNotificationsAsRead = async () => {
    try {
      const response = await Axios.post(
        `notification/read`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(user);
  useEffect(() => {
    const fetchNotification = async () => {
      console.log("token", token);
      const data = await Axios.post(`notification/all`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.data);
      setNotifications(data.data);
    };
    fetchNotification();
  }, []);

  console.log();
  return (
    <div className="vh-100 w-2/3   w  overflow-y-scroll scroll-smooth  bg-gray-200 ">
      <div className="feedWrapper">
        {/* <button
          className="bg-sky-600 m-4 p-4 right-0 rounded-full "
          onClick={markAllNotificationsAsRead}
        >
          Mark all as read
        </button> */}

        <SingleNotification Notifications={Notifications} />
      </div>
    </div>
  );
};

export default NotificationFeed;
