import React from "react";
import FriendsCard from "./friendsCard/FriendsCard";
import FriendsList from "./friendslist/FriendsList";
import FriendsRequestCard from "./friendsRequestCard/FriendsRequestCard";
import Profile from "./ProfileCard/Profile";
// import "./Rightbar.css";

export default function RightbarHome({ profile }) {
  const HomeRightBar = () => {
    return (
      <>
        <h1></h1>
        <Profile />
        <h4 className="rightbarTitle">Online Friends</h4>

        <FriendsCard className="rightbarFriendList" />
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

  return (
    <div className="rightbar">
      <HomeRightBar />
    </div>
  );
}
