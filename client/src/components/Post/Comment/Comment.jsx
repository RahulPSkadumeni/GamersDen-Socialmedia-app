import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "../../../utils/axios";
import { Link } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { BsTrashFill } from "react-icons/bs";
function Comment({ postId, comment, setAllComments, userId }) {
  const [replay, setReplay] = useState(null);
  const currentUserId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  console.log("LLLLLLLLLLLLLL", token);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const deleteComment = async (id) => {
    console.log("first");

    const data = await Axios.delete(`comment/delete/${id}`);
    console.log(data);
    let updatedComments = await Axios.get(`comment/post/${postId}`);
    console.log("updatedComments", updatedComments.data);
    setAllComments(updatedComments.data);
  };

  const deleteReplay = async (commentId, replayId) => {
    console.log(commentId, replayId);
    console.log("delete replay");
    const data = await Axios.delete(
      `comment/replay-delete/${commentId}/${replayId}`
    );

    let updatedComments = await Axios.get(`comment/post/${postId}`);
    console.log("updatedComments", updatedComments.data);
    setAllComments(updatedComments.data);
  };
  const postReplay = async () => {
    const response = await Axios.post(
      "comment/create-replay",
      {
        CommentText: replay,
        // user: user._id,
        commentId: comment._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    let updatedComments = await Axios.get(`comment/post/${postId}`);
    console.log("updatedComments", updatedComments.data);
    setAllComments(updatedComments.data);
  };

  return (
    // <>
    //   <div className="flex-col bg-white mt-3">
    //     <div className="flex flex-col justify-between items-center m-1 p-1 rounded-sm bg-gray-100">
    //       <p className="mr-2 ">{comment.CommentText}</p>
    //       <button
    //         onClick={() => {
    //           setOpen(!open);
    //         }}
    //         className="bg-gray-300  rounded-all p-1 m-1"
    //       >
    //         show replay
    //       </button>

    //       <div className="flex items-center">
    //         <div className="  text-right">
    //           <input
    //             type="text"
    //             placeholder="Reply"
    //             className="mr-2 py-1 px-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    //             value={replay}
    //             onChange={(e) => setReplay(e.target.value)}
    //           ></input>{" "}
    //           <button
    //             onClick={postReplay}
    //             className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-6 mr-5 rounded-full hover:shadow-lg transform transition-all duration-500 hover:-translate-y-1"
    //           >
    //             Post
    //           </button>
    //           {comment.user._id === currentUserId ? (
    //             <button
    //               onClick={(e) => deleteComment(comment._id)}
    //               className="bg-red-500 hover:text-red-600  text-white rounded-full px-3 focus:outline-none"
    //             >
    //               X
    //             </button>
    //           ) : null}
    //           {/* {open && ( */}
    //           <div className="flex flex-col text-right ">
    //             {open &&
    //               comment?.replies?.map((reply) => (
    //                 <div className="flex">
    //                   {reply?.commentText}

    //                   {reply?.user === currentUserId ? (
    //                     <button
    //                       onClick={(e) => deleteReplay(comment._id, reply._id)}
    //                       className="bg-red-500 text-white font-bold my-1 px-2 rounded-full hover:shadow-lg transform transition-all duration-500 hover:-translate-y-1"
    //                     >
    //                       X
    //                     </button>
    //                   ) : null}
    //                 </div>
    //               ))}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <div key={comment.id} className="mt-2  grow ">
        {/* <Avatar url={comment.profiles.avatar} /> */}
        <div className="bg-gray-200 py-2 px-4 rounded-3xl">
          <div>
            <Link href={"/profile/" + comment.user.id}>
              <span className="hover:underline font-semibold mr-1">
                {/* {comment.profiles.name} */}
              </span>
            </Link>
            <span className="text-sm text-gray-400">
              <ReactTimeago
                timeStyle={"twitter"}
                date={new Date(comment.created_at).getTime()}
              />
            </span>
          </div>
          <div>
            <div>
              {" "}
              <p className="flex text-2xl">
                {comment.CommentText}{" "}
                <div>
                  {comment.user._id === currentUserId ? (
                    <button onClick={(e) => deleteComment(comment._id)}>
                      <p
                        delete
                        className="ml-auto flex-end text-red-500 pl-5"
                        size={"5px"}
                      >
                        delete
                      </p>
                    </button>
                  ) : null}
                </div>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="ml-auto flex-end  text-m "
          >
            {comment?.replies?.length} Replay
          </button>
          <div className="flex flex-col ">
            {open &&
              comment?.replies?.map((reply) => (
                <div className="ml-auto flex-end bg-slate-50 rounded-lg m-2 text-2xl ">
                  <Link href={"/profile/" + comment.user.id}></Link>
                  {reply?.commentText}

                  {reply?.user === currentUserId ? (
                    <button
                      onClick={(e) => deleteReplay(comment._id, reply._id)}
                      className="font-bold my-1 px-2 rounded-full hover:shadow-lg transform transition-all duration-500 hover:-translate-y-1"
                    >
                      <BsTrashFill className="text-red-500" size={"15px"} />
                    </button>
                  ) : null}
                </div>
              ))}
          </div>
          <form onSubmit={postReplay}>
            <input
              value={replay}
              onChange={(e) => setReplay(e.target.value)}
              className="block w-full p-3 px-4 overflow-hidden h-12 rounded-full"
              placeholder="Leave a replay"
            />
          </form>
        </div>

        <div>
          <Link href={"/profile/" + comment.user.id}>
            <span className="hover:underline font-semibold mr-1">
              {/* {comment.profiles.name} */}
            </span>
          </Link>
          <span className="text-sm text-gray-400">
            <ReactTimeago
              timeStyle={"twitter"}
              date={new Date(comment.created_at).getTime()}
            />
          </span>
        </div>
      </div>
    </>
  );
}

export default Comment;
