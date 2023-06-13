import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { BsTrashFill } from "react-icons/bs";
import { useState } from "react";
// import { format } from "timeago.js";
import { likeimg, AiTwotoneLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../pages/state";
import TimeAgo from "react-timeago";
import CommentsBox from "../CommentsBox/CommentsBox";
import ReactTimeago from "react-timeago";
import Axios from "../../utils/axios";
import Card from "../Card/Card";
import ClickOutHandler from "react-clickout-handler";
import Comment from "./Comment/Comment";

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
  const [allComments, setAllComments] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [commentText, setCommentText] = useState(null);
  // console.log(user);
  // console.log(post._id);
  const postComment = async () => {
    const response = await Axios.post(
      "comment/createComment",
      {
        CommentText: commentText,
        user: user._id,
        post: post._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);

    setAllComments([response.data, ...allComments]);
  };

  const getComments = async () => {
    const data = await Axios.get(`comment/post/${post._id}`);
    console.log("comment>>>>>>>>MMMMM<<<<<<<", data.data);
    setAllComments(data.data);
  };

  useEffect(() => {
    getComments();
    // console.log(allComments);
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`users/${post.userId}`);
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
        dispatch(
          setPost({
            post: like.data,
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
    // <div className=" bg-gray-500/40 bg-opacity-50 backdrop-filter backdrop-blur-lg font-mono w-full rounded-3xl text-center p-6 mt-5 shadow-lg">
    //   <div className="postWrapper">
    //     <div className="postTop">
    //       <Link to={`profile/${post.userId}`}>
    //         <div className="postTopLeft">
    //           <img
    //             className="h-10 rounded-full "
    //             src={
    //               post.profilePicture
    //                 ? PF + post.profilePicture
    //                 : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
    //             }
    //             alt="p"
    //           />
    //           <span className=" pl-1 text-xl  font-semibold">
    //             {user.userName}
    //           </span>
    //           <span className=" text-cyan-900 pl-4 text-left ">
    //             <ReactTimeago date={new Date(post.createdAt).getTime()} />
    //           </span>
    //         </div>
    //       </Link>

    //       <div className="w-11/12"></div>
    //       {post.userId === currentUserId && (
    //         <button
    //           onClick={deleteHandler}
    //           className=" p-3 text-center text-red-700   rounded-full  hover:bg-red-700 hover:text-white "
    //         >
    //           <BsTrashFill size={"30px"} />
    //         </button>
    //       )}
    //       <div> </div>
    //     </div>
    //     <div className="text-white text-left text-xl  w-10/12">{post?.des}</div>
    //     <div className="postCenter">
    //       {/* <span className="text-left">{post?.des}</span> */}
    //       <img className=" w-430 h-768" src={post?.image} alt="" />
    //       {/* {post.image} */}
    //     </div>
    //     <div className="postBottom">
    //       <div className="postBottomLeft">
    //         {isliked ? (
    //           <img
    //             onClick={likeHandler}
    //             className="likeIcon"
    //             src="https://www.vectorico.com/wp-content/uploads/2019/01/heart-icon-300x300.png"
    //             alt=""
    //           />
    //         ) : (
    //           <img
    //             onClick={likeHandler}
    //             className="likeIcon "
    //             src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy4yMzQgMy4wMDRjLTIuNjUyIDAtNS4yMzQgMS44MjktNS4yMzQgNS4xNzcgMCAzLjcyNSA0LjM0NSA3LjcyNyA5LjMwMyAxMi41NC4xOTQuMTg5LjQ0Ni4yODMuNjk3LjI4M3MuNTAzLS4wOTQuNjk3LS4yODNjNC45NzctNC44MzEgOS4zMDMtOC44MTQgOS4zMDMtMTIuNTQgMC0zLjM1My0yLjU4LTUuMTY4LTUuMjI5LTUuMTY4LTEuODM2IDAtMy42NDYuODY2LTQuNzcxIDIuNTU0LTEuMTMtMS42OTYtMi45MzUtMi41NjMtNC43NjYtMi41NjN6bTAgMS41YzEuOTkuMDAxIDMuMjAyIDEuMzUzIDQuMTU1IDIuNy4xNC4xOTguMzY4LjMxNi42MTEuMzE3LjI0MyAwIC40NzEtLjExNy42MTItLjMxNC45NTUtMS4zMzkgMi4xOS0yLjY5NCA0LjE1OS0yLjY5NCAxLjc5NiAwIDMuNzI5IDEuMTQ4IDMuNzI5IDMuNjY4IDAgMi42NzEtMi44ODEgNS42NzMtOC41IDExLjEyNy01LjQ1NC01LjI4NS04LjUtOC4zODktOC41LTExLjEyNyAwLTEuMTI1LjM4OS0yLjA2OSAxLjEyNC0yLjcyNy42NzMtLjYwNCAxLjYyNS0uOTUgMi42MS0uOTV6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="
    //             alt=""
    //           />
    //         )}
    //         <span onClick={likeHandler} className="postLikeCounter">
    //           {post.likes.length} people like it
    //         </span>
    //         <span className="postacommentText">{post.comment} </span>{" "}
    //         <img
    //           onClick={getComments}
    //           src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAxYy02LjMzOCAwLTEyIDQuMjI2LTEyIDEwLjAwNyAwIDIuMDUuNzM5IDQuMDYzIDIuMDQ3IDUuNjI1bC0xLjk5MyA2LjM2OCA2Ljk0Ni0zYzEuNzA1LjQzOSAzLjMzNC42NDEgNC44NjQuNjQxIDcuMTc0IDAgMTIuMTM2LTQuNDM5IDEyLjEzNi05LjYzNCAwLTUuODEyLTUuNzAxLTEwLjAwNy0xMi0xMC4wMDd6bTAgMWM2LjA2NSAwIDExIDQuMDQxIDExIDkuMDA3IDAgNC45MjItNC43ODcgOC42MzQtMTEuMTM2IDguNjM0LTEuODgxIDAtMy40MDEtLjI5OS00Ljk0Ni0uNjk1bC01LjI1OCAyLjI3MSAxLjUwNS00LjgwOGMtMS4zMDgtMS41NjQtMi4xNjUtMy4xMjgtMi4xNjUtNS40MDIgMC00Ljk2NiA0LjkzNS05LjAwNyAxMS05LjAwN3ptLTUgNy41Yy44MjggMCAxLjUuNjcyIDEuNSAxLjVzLS42NzIgMS41LTEuNSAxLjUtMS41LS42NzItMS41LTEuNS42NzItMS41IDEuNS0xLjV6bTUgMGMuODI4IDAgMS41LjY3MiAxLjUgMS41cy0uNjcyIDEuNS0xLjUgMS41LTEuNS0uNjcyLTEuNS0xLjUuNjcyLTEuNSAxLjUtMS41em01IDBjLjgyOCAwIDEuNS42NzIgMS41IDEuNXMtLjY3MiAxLjUtMS41IDEuNS0xLjUtLjY3Mi0xLjUtMS41LjY3Mi0xLjUgMS41LTEuNXoiLz48L3N2Zz4="
    //         ></img>
    //       </div>
    //       {/* <MoreVert /> */}
    //       {open && <CommentsBox post={post} />}
    //     </div>
    //   </div>
    // </div>
    <Card>
      <div className="flex gap-3">
        <div>
          <Link href={"/profile"}>
            {/* <span className="cursor-pointer">
            {authorProfile.avatar}?  <Avatar url={authorProfile.avatar} />: <Avatar url= />
            </span> */}
          </Link>
        </div>
        <div className="grow">
          <p>
            <Link href={`profile/${post.userId}`}>
              <span className="mr-1 font-semibold cursor-pointer hover:underline">
                {user.userName}
              </span>
            </Link>
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
                    <span className="flex -mx-4 hover:shadow-md gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white px-4 rounded-md transition-all hover:scale-110 shadow-gray-300">
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
                      {/* {isSaved && (
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
                            d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                          />
                        </svg>
                      )}
                      {!isSaved && (
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
                      )}
                      {isSaved ? "Remove from saved" : "Save post"} */}
                    </span>
                  </button>
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
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                      />
                    </svg>
                    Turn notifications
                  </a> */}
                  <a
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Hide post
                  </a>
                  <a
                    href=""
                    onClick={deleteHandler}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </a>
                  <a
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
                  </a>
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
            <input
              value={commentText}
              onChange={(ev) => setCommentText(ev.target.value)}
              className="block w-full p-3 px-4 overflow-hidden h-12 rounded-full"
              placeholder="Leave a comment"
            />
          </form>
          <button className="absolute  top-3 right-3 text-gray0-400">
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
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
