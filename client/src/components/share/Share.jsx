import React from "react";
import "./share.css";
import { IoSendSharp } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setPosts } from "../../pages/state";
import axios from "axios";
import AiFillEdit from "react-icons/ai";
import Test from "../../pages/testpage/Test";
import { fetchPost } from "../../api/postApi/post";
import Axios from "../../utils/axios";

const Share = ({ groupId = false }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false); //act as a switch weather someone clicked to open dropzone
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const userid = user._id;

  const handlePost = async (event) => {
    event.preventDefault();
    console.log("groupId>>>>>>>>>>_______>>>>>", groupId);
    const formData = new FormData();
    if (groupId) {
      formData.append("groupId", groupId);
    }
    formData.append("image", file);
    formData.append("des", caption);
    formData.append("userId", userid);
    await Axios.post("posts/createpostImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const fetchPost = async (userId) => {
      console.log("fetch posts");
      let res = await Axios.get("/posts/profile/" + userId);
      console.log("fsnjsfnljsf", res);
      // setPosts(res.data);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    };
    fetchPost(userid);
  };

  return (
    <div className=" Share">
      <div className="grid grid-cols-1 lg:grid-cols-1">
        {" "}
        <div className=" lg:p-4 text-left">
          <img
            className="shareProfileImg w-full h-auto mt-12 object-cover lg:w-auto lg:h-80 lg:rounded-lg"
            src="https://helostatus.com/wp-content/uploads/2021/08/profile-pictures-for-WhatsApp.jpg"
            alt="profilepic"
          />
          <div className="text-gray-100 text-xl "> What's happening? </div>
        </div>
        <div className="p-4">
          <textarea
            className="w-full border-2 border-gray-200 rounded-lg p-4 mb-4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Caption"
          />
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-4"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            accept="image/*"
            placeholder="add Image"
          />
        </div>
        <div className="flex items-center justify-end p-4">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-5 mr-5 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handlePost}
          >
            <IoSendSharp />
            <span className="ml-2">Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
