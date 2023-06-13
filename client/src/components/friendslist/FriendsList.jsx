import React, { useEffect, useState } from "react";
import "./FriendsList.css";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../api/usersApi/user";

const FriendsList = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const userId = user._id;
  const [friends, setFriends] = useState([]);

  const getFriendlist = async () => {
    console.log("first>>>>>>>>>>>NNNMMMMMM", userId);
    let friendlist = await fetchFriends(userId);
    console.log(">>f>>>", friendlist);
    setFriends(friendlist);
  };

  useEffect(() => {
    getFriendlist();
  }, []);

  return (
    <>
      {friends?.length > 0
        ? friends.map((friendList) => (
            <div>
              <ul className="friendlistClass">
                <li className="rightbarFriendLists  hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                  <div className="rigthBarFollowing">
                    <img
                      className="rigthBarFollowingImage"
                      src="https://yt3.ggpht.com/a/AATXAJys2bv2usxWQh3_e0EKXkz6WCFXilIXhIElPg=s900-c-k-c0xffffffff-no-rj-mo"
                      alt=""
                    />
                  </div>
                  <span className="rigthBarFollowingName font-medium text-xl">
                    {friendList.userName}
                  </span>
                </li>
              </ul>
            </div>
          ))
        : null}
    </>
  );
};

export default FriendsList;
