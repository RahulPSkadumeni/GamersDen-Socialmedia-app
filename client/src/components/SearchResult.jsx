import React from "react";
import { Link, useLocation } from "react-router-dom";
import Post from "./Post/Post";
import HeaderComponent from "./HeaderComponent";
import Sidebar from "./Sidebar";
import RightbarHome from "./RightbarHome";
import { SideNaveBar } from "./SideNavbar/SideNavebar";
import Head from "./Head";

function SearchResult() {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div className=" ">
      {/* <HeaderComponent /> */}
      <Head />

      {/* <Head /> */}
      <div className="flex justify-between bg-gray-300 rounded-3xl p-4">
        <SideNaveBar />
        <div className=" ">
          <h1 className="text-3xl font-bold mb-4  text-gray-800 dark:text-white">
            Search Results
          </h1>
          {data.posts?.map((post) => (
            <Post className="m-3  p-6" key={post._id} post={post} />
          ))}
          {data.users.map((user) => (
            <div className="mt-4 rounded-lg  bg-white w-100 p-6" key={user._id}>
              <div className="flex gap-4   items-center">
                <Link to={`/profile/${user._id}`}>
                  <a href="#" className="relative block">
                    <img
                      alt=""
                      src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
                      className="rounded-full h-16 w-16 object-cover"
                    />
                  </a>
                </Link>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-800 dark:text-white">
                    {user.userName}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <RightbarHome />
      </div>

      {/* {
        <div className="col-span-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Search Results
          </h1>
          {data.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
          {data.users.map((user) => (
            <div
              className="mt-4 rounded-lg bg-white dark:bg-gray-700 p-4"
              key={user._id}
            >
              <div className="flex gap-4 items-center">
                <Link to={`/profile/${user._id}`}>
                  <a href="#" className="relative block">
                    <img
                      alt=""
                      src="https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
                      className="rounded-full h-16 w-16 object-cover"
                    />
                  </a>
                </Link>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-gray-800 dark:text-white">
                    {user.userName}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      } */}
    </div>
  );
}

export default SearchResult;
