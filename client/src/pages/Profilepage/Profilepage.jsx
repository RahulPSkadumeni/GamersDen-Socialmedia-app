import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Feed from "../../components/Feed";
import HeaderComponent from "../../components/HeaderComponent";
import ProfileComponent from "../../components/ProfileComponent";
import Rightbar from "../../components/Rightbar";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { BiEdit } from "react-icons/bi";

import "./Profilepage.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/baseurl";
import { SideNaveBar } from "../../components/SideNavbar/SideNavebar";
import Head from "../../components/Head";
const Profilepage = () => {
  // const [user, setUser] = useState({});
  const [Profile, setProfile] = useState({});
  const currentUser = useSelector((state) => state.user);
  const { userId } = useParams();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  console.log(userId);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(BASE_URL + `/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response>>>>>>>>>", response);
    const data = await response.json();
    // console.log(
    //   ">>>>>>>>>>>SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS>>>>>>>>",
    //   data
    // );

    setProfile(data);
  };

  console.log("Profile");
  console.log(Profile);

  if (!Profile) {
    return null;
  }

  return (
    <>
      <div className="bg-white">
        <Head />
        <div className="profile">
          <SideNaveBar />

          <ProfileComponent />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImage"
                  src={"https://www.fbcoverlover.com/covers/game4.jpg?i"}
                  alt="coverImg"
                />

                <img
                  className="profileUserImage"
                  src={Profile.picturePath}
                  alt="profileAvatar"
                />
              </div>

              <div className="pt-28 pb-5 mt-5 ">
                {Profile && (
                  <h3 className="text-slate-50   text-center">
                    {Profile.firstName}
                    {Profile.lastName}
                  </h3>
                )}

                <div className="status">
                  <p className="text-white  text-center">{Profile.desc}</p>
                </div>
              </div>
            </div>

            {
              // <div
              //   className="status  text-4xl  text-white translate-x-1/2 mr-7 hover:text-red-700  cursor-pointer text-center"
              //   onClick={() => navigate(`/editProfile/${Profile._id}`)}
              // >
              //   <BiEdit />
              // </div>
            }
            <div className="profileRightBottom">
              <div className="bg-slate-600 w-3/4 h-v100%">
                {" "}
                <Feed userId={userId} isProfile={true} />
              </div>

              <Rightbar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
