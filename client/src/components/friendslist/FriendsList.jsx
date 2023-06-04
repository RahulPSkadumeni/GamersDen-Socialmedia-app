import React from "react";
import "./FriendsList.css";

const FriendsList = () => {
  return (
    <div>
      <ul className="friendlistClass">
        <li className="rightbarFriendLists">
          <div className="rigthBarFollowing">
            <img
              className="rigthBarFollowingImage"
              src="https://yt3.ggpht.com/a/AATXAJys2bv2usxWQh3_e0EKXkz6WCFXilIXhIElPg=s900-c-k-c0xffffffff-no-rj-mo"
              alt=""
            />
          </div>
          <span className="rigthBarFollowingName"> Amal K</span>
        </li>
      </ul>
    </div>
  );
};

export default FriendsList;
