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
import BASE_URL from "../../utils/baseurl";

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
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

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
    await Axios.post(BASE_URL + "/posts/createpostImg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("?????>>>>>>>>>>>>>>>");
    fetchPost(userid);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a FileReader to read the image file and get its preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const fetchPost = async (userId) => {
    console.log("fetch posts");
    let res = await Axios.get(BASE_URL + "/posts/timeline/" + userId);
    console.log("fsnjsfnljsf", res);
    // setPosts(res.data);

    dispatch(
      setPosts({
        posts: res.data,
      })
    );
  };

  return (
    <div className=" Share">
      <div className="grid grid-cols-1 lg:grid-cols-1">
        <div className=" lg:p-4 text-left">
          <img
            className="shareProfileImg w-full h-auto mt-12 object-cover lg:w-auto lg:h-80 lg:rounded-lg"
            src="https://w0.peakpx.com/wallpaper/794/29/HD-wallpaper-best-whatsapp-dp-boy-walking-alone-birds.jpg"
            alt="profilepic"
          />

          {/* <div className="text-gray-100 text-xl "> What's happening? </div> */}

          <div className="lg:p-4 text-left">
            <div className="text-gray-100 text-xl">What's happening?</div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex">
            <textarea
              className="w-full border-2 border-gray-200 rounded-lg p-4 mb-4"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              placeholder="Caption"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center mt-5 px-8 h-14 rounded-full shadow-sm text-base font-medium text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              onClick={handlePost}
            >
              <IoSendSharp />
              <span className="ml-2 font-semibold text-lg justify-center ">
                Post
              </span>
            </button>
          </div>
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-4"
            onChange={((e) => setFile(e.target.files[0]), handleFileChange)}
            type="file"
            accept="image/*"
            placeholder="add Image"
          />
        </div>
        <div className="flex items-center justify-center">
          {imagePreviewUrl && (
            <img
              className="w-full h-auto mt-12 object-cover object-center lg:w-auto lg:h-80 lg:rounded-lg "
              src={imagePreviewUrl}
              alt="profilepic"
            />
          )}
        </div>
        <div className="flex items-center justify-end p-4"></div>
      </div>
    </div>
  );
};

export default Share;
