import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import BASE_URL from "../../utils/baseurl";
import { BiEdit } from "react-icons/bi";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
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
  // console.log("???????????????>?", profile);
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

  // console.log(profile.firstName);
  return (
    <div className="profilecard">
      <div
        className="card-container"
        // onClick={() => navigate(`/profile/${user._Id}`)}
      >
        <div className="image-container">
          {profile?.picturePath ? (
            <img
              className="h-28 round "
              src={profile?.picturePath}
              alt="user"
            />
          ) : (
            <img
              className="h-28 round "
              src="https://w0.peakpx.com/wallpaper/208/752/HD-wallpaper-whatsapp-dp-cartoon.jpg"
              alt="user"
            />
          )}
        </div>

        <h3 href="#">{profile.userName}</h3>

        <h4>{user.email}</h4>
        <p>
          {user.desc} <br /> “Do more of what makes you happy.”
        </p>
        <p className="font-bold">{user.phoneNumber}</p>
        <div>
          <div
            className="status  text-4xl  text-black translate-x-1/2 mr-7 hover:text-red-700  cursor-pointer text-center"
            onClick={() => navigate(`/editProfile/${Profile._id}`)}
          >
            <BiEdit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
