import React, { useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import ReactTimeago from "react-timeago";
import { getUser } from "../../api/usersApi/user";

const Snotification = (props) => {
  const notification = props.notification;
  console.log("notification", notification);

  const [notificationUser, setNotificationUser] = useState();
  console.log(notificationUser, ">>>>notifictionUser");
  const setNotificationUserDetails = async () => {
    let user = await getUser(notification.user);
    console.log("notooooooooooooooooooo", notification.user2);
    setNotificationUser(user);
  };

  useEffect(() => {
    setNotificationUserDetails();
  }, []);

  return (
    <div>
      <div className="post" key={notification._id}>
        <div className="postWrapper">
          <div className="bg-emerald-800 rounded-3xl p-2 m-3">
            <div className="postTopLeft">
              <img
                className=" h-12 rounded-full"
                src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-purple-samurai-e-sports-logo-for-gaming-mascot-or-twitch-profile-png-image_4278450.jpg"
                alt="profilepic"
              />
              <div className="m-5">
                <span className="text-white">{notification.message}</span>
                <ReactTimeago
                  className="p-5 right-1 mt-3 text-gray-50"
                  date={new Date(notification.createdAt).getTime()}
                />
              </div>
              <div>
                <div className="">
                  {notification.read}
                  {/* {notification.read ? (
                    <div className="absolute text-white 2xl right-1">
                      <BsCheckAll />
                    </div>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snotification;
