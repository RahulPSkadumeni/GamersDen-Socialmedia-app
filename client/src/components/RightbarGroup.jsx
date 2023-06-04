import React from "react";
import FriendsCard from "./friendsCard/FriendsCard";
import FriendsList from "./friendslist/FriendsList";
import FriendsRequestCard from "./friendsRequestCard/FriendsRequestCard";
import Profile from "./ProfileCard/Profile";
import "./Rightbar.css";

export default function RightbarGroup({ profile }) {
  const ProfileRightBar = () => {
    return (
      <div>
        <Profile />
        <h1 className="RIghtbarTitle">Group Information Title </h1>
        <div className="Rightbarinfo">
          <div className="rightbarInfoItem"></div>
        </div>

        <h4>User Members</h4>
        <FriendsList />
      </div>
    );
  };

  return (
    <div div className="rightbar">
      <ProfileRightBar />
    </div>
  );
}
