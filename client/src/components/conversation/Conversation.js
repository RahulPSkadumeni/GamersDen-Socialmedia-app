import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/usersApi/user";

function Conversation({ data, currentUser, online }) {
  const [userData, setUserData] = useState(null);
  console.log(">>>>>userData", userData);
  useEffect(() => {
    // console.log(data);
    const userId = data.members.find((id) => id !== currentUser);

    try {
      const getUserData = async () => {
        const data = await getUser(userId);

        setUserData(data);
      };
      getUserData(userId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="bg-white rounded-3xl flex ">
        <div className="flex flex-col ">
          {online && <div className="online-dot ">.</div>}

          <div className="text-black  text-2xl p-3">
            <img
              src={
                userData?.picturePath
                  ? userData.picturePath
                  : "https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
              }
              alt=""
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span
              className="p-4 text-end"
              style={{ color: online ? "#51e200" : "#808080" }}
            >
              {/* {online ? "Online" : "Offline"}. */}
              {!online ? "Offline" : "online"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid ##808080" }} />
    </>
  );
}

export default Conversation;
