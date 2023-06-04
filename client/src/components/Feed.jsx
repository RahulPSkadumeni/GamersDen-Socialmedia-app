import React, { useEffect, useState } from "react";
import "./Feed.css";
import Logo2 from "./Logo/Logo2";
import Post from "./Post/Post";
import Share from "./share/Share";
import BASE_URL from "../utils/baseurl";

import { Posts } from "../../src/dummyData";
import Banner from "./Banner/Banner";
import axios from "axios";
import { getPosts } from "../api/postApi/post";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../pages/state";
import Create from "./share/Create";

const Feed = ({ userId, isProfile = false }) => {
  const [text, setText] = useState([]);
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  console.log("postssss>>>>>>>>>>>>>>>>>>>", posts);
  console.log("postssss", user._id);
  const userIdp = user._id;
  const dispatch = useDispatch();
  console.log("first", userIdp);
  useEffect(() => {
    try {
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchPost = async () => {
    if (isProfile) {
      let res = await axios.get(BASE_URL + "/posts/profile/" + userId);
      console.log("profile post", res.data);

      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    } else {
      console.log("timelineeeeeeeeeeeeeeeeee");
      const res = await axios.get(BASE_URL + "/posts/timeline/" + userIdp);
      console.log("timeline post", res.data);
      dispatch(
        setPosts({
          posts: res.data,
        })
      );
    }
  };

  console.log("post length>>>>>>>>>>>>>>>>>>", posts.length);

  return (
    <div className="h-full overflow-y-scroll bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 font-mono w rounded-3xl text-center p-6 ">
      <div style={{ margin: "100px" }}>
        <Share content={content} setContent={setContent} />

        {posts && posts?.map((p) => <Post key={p._id} post={p} />)}
      </div>
    </div>
  );
};

export default Feed;
