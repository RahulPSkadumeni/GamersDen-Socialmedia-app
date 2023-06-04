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

const Post = ({ post }) => {
  console.log(" post picture", post);
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

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`users/${post.userId}`);
      console.log(res.data);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    const like = await Axios.put(`/posts/${post._id}/like`, {
      userId: currentUserId,
    });
    console.log(like);

    dispatch(
      setPost({
        post: like.data,
      })
    );
  };

  const deleteHandler = async () => {
    console.log(currentUserId);
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
        console.log(deletepost);
        dispatch(
          setPost({
            post: like.data,
          })
        );
      }
    }
  };

  const getComments = async (e) => {
    e.preventDefault();
    const data = await Axios.get(`comment/post/${post._id}`);
    console.log(data);
    setAllComments(data.data);
    setOpen(!open);
  };

  return (
    <div className=" bg-gray-500/40 bg-opacity-50 backdrop-filter backdrop-blur-lg font-mono w-full rounded-3xl text-center p-6 mt-5 shadow-lg">
      <div className="postWrapper">
        <div className="postTop">
          <Link to={`profile/${post.userId}`}>
            <div className="postTopLeft">
              <img
                className="h-10 rounded-full "
                src={
                  post.profilePicture
                    ? PF + post.profilePicture
                    : "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
                }
                alt="p"
              />
              <span className=" pl-1 text-xl  font-semibold">
                {user.userName}
              </span>
              <span className=" text-cyan-900 pl-4 text-left ">
                <ReactTimeago date={new Date(post.createdAt).getTime()} />
              </span>
            </div>
          </Link>

          <div className="w-11/12"></div>
          {post.userId === currentUserId && (
            <button
              onClick={deleteHandler}
              className=" p-3 text-center text-red-700   rounded-full  hover:bg-red-700 hover:text-white "
            >
              <BsTrashFill size={"30px"} />
            </button>
          )}
          <div> </div>
        </div>
        <div className="text-white text-left text-xl  w-10/12">{post?.des}</div>
        <div className="postCenter">
          {/* <span className="text-left">{post?.des}</span> */}
          <img className=" w-430 h-768" src={post?.image} alt="" />
          {/* {post.image} */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isliked ? (
              <img
                onClick={likeHandler}
                className="likeIcon"
                src="https://www.vectorico.com/wp-content/uploads/2019/01/heart-icon-300x300.png"
                alt=""
              />
            ) : (
              <img
                onClick={likeHandler}
                className="likeIcon "
                src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNy4yMzQgMy4wMDRjLTIuNjUyIDAtNS4yMzQgMS44MjktNS4yMzQgNS4xNzcgMCAzLjcyNSA0LjM0NSA3LjcyNyA5LjMwMyAxMi41NC4xOTQuMTg5LjQ0Ni4yODMuNjk3LjI4M3MuNTAzLS4wOTQuNjk3LS4yODNjNC45NzctNC44MzEgOS4zMDMtOC44MTQgOS4zMDMtMTIuNTQgMC0zLjM1My0yLjU4LTUuMTY4LTUuMjI5LTUuMTY4LTEuODM2IDAtMy42NDYuODY2LTQuNzcxIDIuNTU0LTEuMTMtMS42OTYtMi45MzUtMi41NjMtNC43NjYtMi41NjN6bTAgMS41YzEuOTkuMDAxIDMuMjAyIDEuMzUzIDQuMTU1IDIuNy4xNC4xOTguMzY4LjMxNi42MTEuMzE3LjI0MyAwIC40NzEtLjExNy42MTItLjMxNC45NTUtMS4zMzkgMi4xOS0yLjY5NCA0LjE1OS0yLjY5NCAxLjc5NiAwIDMuNzI5IDEuMTQ4IDMuNzI5IDMuNjY4IDAgMi42NzEtMi44ODEgNS42NzMtOC41IDExLjEyNy01LjQ1NC01LjI4NS04LjUtOC4zODktOC41LTExLjEyNyAwLTEuMTI1LjM4OS0yLjA2OSAxLjEyNC0yLjcyNy42NzMtLjYwNCAxLjYyNS0uOTUgMi42MS0uOTV6IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="
                alt=""
              />
            )}
            <span onClick={likeHandler} className="postLikeCounter">
              {post.likes.length} people like it
            </span>
            <span className="postacommentText">{post.comment} </span>{" "}
            <img
              onClick={getComments}
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiAxYy02LjMzOCAwLTEyIDQuMjI2LTEyIDEwLjAwNyAwIDIuMDUuNzM5IDQuMDYzIDIuMDQ3IDUuNjI1bC0xLjk5MyA2LjM2OCA2Ljk0Ni0zYzEuNzA1LjQzOSAzLjMzNC42NDEgNC44NjQuNjQxIDcuMTc0IDAgMTIuMTM2LTQuNDM5IDEyLjEzNi05LjYzNCAwLTUuODEyLTUuNzAxLTEwLjAwNy0xMi0xMC4wMDd6bTAgMWM2LjA2NSAwIDExIDQuMDQxIDExIDkuMDA3IDAgNC45MjItNC43ODcgOC42MzQtMTEuMTM2IDguNjM0LTEuODgxIDAtMy40MDEtLjI5OS00Ljk0Ni0uNjk1bC01LjI1OCAyLjI3MSAxLjUwNS00LjgwOGMtMS4zMDgtMS41NjQtMi4xNjUtMy4xMjgtMi4xNjUtNS40MDIgMC00Ljk2NiA0LjkzNS05LjAwNyAxMS05LjAwN3ptLTUgNy41Yy44MjggMCAxLjUuNjcyIDEuNSAxLjVzLS42NzIgMS41LTEuNSAxLjUtMS41LS42NzItMS41LTEuNS42NzItMS41IDEuNS0xLjV6bTUgMGMuODI4IDAgMS41LjY3MiAxLjUgMS41cy0uNjcyIDEuNS0xLjUgMS41LTEuNS0uNjcyLTEuNS0xLjUuNjcyLTEuNSAxLjUtMS41em01IDBjLjgyOCAwIDEuNS42NzIgMS41IDEuNXMtLjY3MiAxLjUtMS41IDEuNS0xLjUtLjY3Mi0xLjUtMS41LjY3Mi0xLjUgMS41LTEuNXoiLz48L3N2Zz4="
            ></img>
          </div>
          {/* <MoreVert /> */}
          {open && <CommentsBox post={post} />}
        </div>
      </div>
    </div>
  );
};

export default Post;
