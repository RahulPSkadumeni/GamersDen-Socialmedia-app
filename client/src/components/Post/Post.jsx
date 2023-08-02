import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { useState } from "react";
// import { format } from "timeago.js";
import { likeimg, AiTwotoneLike } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../../pages/state";
import TimeAgo from "react-timeago";
import CommentsBox from "../CommentsBox/CommentsBox";
import ReactTimeago from "react-timeago";
import Axios from "../../utils/axios";
import Card from "../Card/Card";
import ClickOutHandler from "react-clickout-handler";
import Comment from "./Comment/Comment";
import BASE_URL from "../../utils/baseurl";

const Post = ({ post }) => {
  // console.log(" post picture", post);
  const [like, setLike] = useState(post.like);
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.user._id);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const isliked = post.likes.includes(currentUserId);
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState(null);
  const [replay, setReplay] = useState(null);
  const [open, setOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const navigate = useNavigate();
  console.log("user?????????????????????", user);
  // console.log(post._id);
  // const postComment = async () => {
  //   console.log("user?????????????????????", user);
  //   console.log(">>>>>>>>>>>>>>>>>>>>>>>>", post._id);
  //   const postId = post._id;
  //   const userId = user._id;
  //   console.log("userId?????????????????????", postId);
  //   console.log("first");
  //   const response = await axios.post(
  //     BASE_URL + "/comment/createComment",
  //     {
  //       CommentText: commentText,
  //       user: userId,
  //       post: postId,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   console.log(response);

  //   setAllComments([response.data, ...allComments]);
  // };

  const postComment = async (e) => {
    e.preventDefault();
    console.log("first");
    try {
      const response = await Axios.post(
        "/comment/createComment",
        {
          CommentText: commentText,
          user: user._id,
          post: post._id,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log(response);
      setCommentText("");

      setAllComments([response.data, ...allComments]);
    } catch (error) {
      console.log("Error posting comment:", error);
    }
  };

  const getComments = async () => {
    const data = await Axios.get(`/comment/post/${post._id}`);
    console.log("comment>>>>>>>>MMMMM<<<<<<<", data.data);
    setAllComments(data.data);
  };

  useEffect(() => {
    getComments();
    // console.log(allComments);
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`/users/${post.userId}`);
      // console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  function openDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(true);
  }
  function handleClickOutsideDropdown(e) {
    e.stopPropagation();
    setDropdownOpen(false);
  }
  const likeHandler = async () => {
    const like = await Axios.put(`/posts/${post._id}/like`, {
      userId: currentUserId,
    });
    // console.log(like);

    dispatch(
      setPost({
        post: like.data,
      })
    );
  };

  const deleteHandler = async () => {
    // console.log(currentUserId);
    if (post.userId === currentUserId) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmDelete) {
        // delete post code here

        const deletepost = await Axios.delete(`posts/delete/${post._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: currentUserId,
          },
        });
        // console.log(deletepost);
        // dispatch(
        //   setPost({
        //     post: like.data,
        //   })
        // );

        const res = await axios.get(
          BASE_URL + "/posts/timeline/" + currentUserId
        );
        // console.log("timeline post", res.data);
        dispatch(
          setPosts({
            posts: res.data,
          })
        );
      }
    }
  };

  // const getComments = async (e) => {
  //   e.preventDefault();
  //   const data = await Axios.get(`comment/post/${post._id}`);
  //   console.log(data);
  //   setAllComments(data.data);
  //   setOpen(!open);
  // };

  return (
    //

    <Card>
      <div className=" flex gap-3 ">
        <div>
          <Link href={"/profile"}>
            {/* <span className="cursor-pointer">
            {authorProfile.avatar}?  <Avatar url={authorProfile.avatar} />: <Avatar url= />
            </span> */}
            <img
              className="h-16 rounded-full"
              src="https://yt3.ggpht.com/a/AATXAJys2bv2usxWQh3_e0EKXkz6WCFXilIXhIElPg=s900-c-k-c0xffffffff-no-rj-mo"
              alt=""
            />
          </Link>
        </div>
        <div className="grow">
          <p>
            {/* <Link href={`/profile/${post.userId}`}> */}
            <span
              onClick={() => {
                navigate(`/profile/${post.userId}`);
              }}
              className="mr-1 font-semibold cursor-pointer hover:underline"
            >
              {user.userName}
            </span>
            {/* </Link> */}
            shared a post
          </p>
          <p className="text-gray-500 text-sm">
            <ReactTimeago date={new Date(post.createdAt).getTime()} />
          </p>
        </div>
        <div className="relative">
          <button className="text-gray-400" onClick={openDropdown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="bg-red w-5 h-5 absolute top-0"></div>
          )}
          <ClickOutHandler onClickOut={handleClickOutsideDropdown}>
            <div className="relative">
              {dropdownOpen && (
                <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                  <button
                    // onClick={toggleSave}
                    className="w-full -my-2"
                  >
                    {/* <span className="flex -mx-4 hover:shadow-md gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white px-4 rounded-md transition-all hover:scale-110 shadow-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                      Save{" "}
                    </span> */}
                  </button>

                  <a
                    href=""
                    onClick={deleteHandler}
                    className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
                  >
                    Delete
                  </a>
                  {/* <a
                    href=""
                    className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    Report
                  </a> */}
                </div>
              )}
            </div>
          </ClickOutHandler>
        </div>
      </div>
      <div>
        <p className="my-3 text-sm">{post?.des}</p>

        <div className="flex gap-4">
          <div key={post} className="">
            <img
              src={post?.image}
              className="rounded-md"
              //  alt={post.image}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-8">
        <button className="flex gap-2 items-center" onClick={likeHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={"w-6 h-6 " + (isliked ? "fill-red-500" : "")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>

          {post.likes?.length}
        </button>
        <button onClick={getComments} className="flex gap-2">
          <svg
            onClick={() => {
              setCommentOpen(!commentOpen);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>{" "}
          {/* comment */}
          {/* {post.comment.length} */}
          {allComments.length}
        </button>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          4
        </button>
      </div>
      <div className="flex mt-4 gap-3">
        <div>{/* <Avatar url={myProfile?.avatar} /> */}</div>
        <div className="border grow rounded-full relative">
          <form onSubmit={postComment}>
            <div className="flex">
              <input
                value={commentText}
                onChange={(ev) => setCommentText(ev.target.value)}
                className="block w-full p-3 px-4 overflow-hidden h-12 rounded-full"
                placeholder="Leave a comment"
              />
              <button
                onClick={postComment}
                // absolute  top-3 right-3
                className=" text-black bg-blue-400 p-4 rounded-3xl"
              >
                post
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="w-full">
        {allComments.length > 0 &&
          allComments.map((comment) => (
            <Comment
              postId={post._id}
              comment={comment}
              setAllComments={setAllComments}
              userId={post.userId}
            />
          ))}
      </div> */}
      <div>
        {allComments.length > 0 &&
          commentOpen &&
          allComments.map((comment) => (
            <Comment
              postId={post._id}
              comment={comment}
              setAllComments={setAllComments}
              userId={post.userId}
            />
          ))}
      </div>
    </Card>
  );
};

export default Post;
