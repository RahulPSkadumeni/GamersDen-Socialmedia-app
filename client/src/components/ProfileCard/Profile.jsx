import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Profile.css";
import BASE_URL from "../../utils/baseurl";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate;
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
  console.log("????????????????", profile);
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

  console.log(profile.firstName);
  return (
    <div className="profilecard">
      <div
        className="card-container"
        onClick={() => navigate(`/profile/${user._Id}`)}
      >
        <div className="image-container">
          <img className="round" src={profile.picturePath} alt="user" />
        </div>

        <h3 href="#">{profile.userName}</h3>

        <h4>{user.email}</h4>
        <p>
          {user.desc} <br /> “Do more of what makes you happy.”
        </p>
        <p className="font-bold">{user.phoneNumber}</p>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
