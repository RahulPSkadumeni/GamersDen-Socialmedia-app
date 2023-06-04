import axios from "axios";
import { async } from "react-input-emoji";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Axios from "../../utils/axios";

const GroupJoin = ({ post }) => {
  const currentUserId = useSelector((state) => state.user);
  console.log(currentUserId);
  const token = useSelector((state) => state.token);
  const handleJoin = async () => {
    console.log("currentUserId", currentUserId);
    const joinGroup = await Axios.post(`group/join/${post._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: currentUserId?._id,
      },
    });
  };
  return (
    <>
      <div class="card mt-5 ml- 3">
        <div class="max-w-sm  m-2 overflow-hidden shadow-2xl rounded-3xl bg-gray-100">
          <Link to={`/group/home/${post._id}`}>
            <img
              class="w-full object-cover"
              src={post.avatar}
              alt="Mountain"
            ></img>
          </Link>
          <div class="px-6 py-4">
            <div className="text-gray-700 text-base">
              {post.members.length} members
            </div>
            <p className="text-gray-700 text-base">
              <div>
                <h3 className="slate-700">{post.groupName} </h3>
              </div>
            </p>
            <h1 className="text-gray-700 text-base">{post.description}</h1>$
            {post.members.includes(currentUserId?._id) ? (
              ""
            ) : (
              <button
                type="button"
                onClick={handleJoin}
                class="w-20 mt-3 m-3  pl-1/2 h-10  left-0 text-base font-medium text-white bg-pink-900 rounded-full hover:bg-pink-700"
              >
                Join
              </button>
            )}
            <div>
              <div className="flex">
                {" "}
                <div className="text-gray-700 text-base"></div>{" "}
                <div className=" text-end text-gray-700 text-base">
                  posts: {post.posts.length}
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div class="px-6 pt-4 pb-2"></div>
        </div>
      </div>
    </>
  );
};
export default GroupJoin;
