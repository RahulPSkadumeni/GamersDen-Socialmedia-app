import React, { useEffect, useState } from "react";
import Logo from "./Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { TypeA } from "./Logout/Logout";
import { useNavigate } from "react-router-dom";
// import { YOUTUBE_SEARCH_API } from "../utils/constants";
// import store from "../utils/store";
// import { cacheResults } from "../utils/searchSlice";

import { filterUser } from "../api/filterApi/filterapi";
import { fetchAllUsers } from "../api/usersApi/user";
import Axios from "../utils/axios";
import { cacheResults } from "./utils/searchSlice";

const Head = () => {
  const [filteredUser, setFilteredUser] = useState([]);
  //   const [searchQuery, setSearchQuery] = useState("");
  //   const [suggestion, setSuggestion] = useState([]);
  //   const [showSuggestion, setShowSuggestion] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const searchCache = useSelector((store) => store.search);
  const [searchTerm, setSearchTerm] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  console.log(searchTerm);
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  //   console.log("suggestion", suggestion);
  //   useEffect(() => {
  //     // cal search api for each search query change
  //     // prevent call if keypress< 200ms using debounce if 2 api call time <200ms decline api call

  //     const timer = setTimeout(() => {
  //       if (searchCache[searchQuery]) {
  //         setSuggestion(searchCache[searchQuery]);
  //       } else {
  //         getSearchSuggestion();
  //         dispatch(cacheResults);
  //       }
  //     }, 200);

  //     return () => {
  //       clearTimeout(timer); // will clear timer if click <200 so prevent api call by rest setTimout of api
  //     };
  //   }, [searchQuery]);

  const getSearchSuggestion = async () => {
    console.log(searchTerm);
    const data = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
        searchTerm
    );
    let jsonData;
    try {
      jsonData = await data.json();

      //console.log("fetching");
      setSuggestion(jsonData[1]);
      dispatch(
        cacheResults({
          [searchQuery]: jsonData[1],
        })
      );
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      console.log("done fetching");
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm !== "") {
      const { data } = await Axios.post("search/searchAll", {
        searchTerm: searchTerm,
      });
      console.log(data);
      navigate("/SearchResult", { state: { data } });
    }
  };
  const clearSearch = () => {
    setFilteredUser(null);
  };

  const getAllUsers = () => {
    fetchAllUsers().then((result) => {
      // setFilteredUser(result);
      setAllUser(result);
    });
  };

  return (
    <div className="grid grid-cols-12 p-2 m-1 shadow-lg">
      <div className="flex col-span-1 items-center">
        {/* <Logo /> */}
        <img
          onClick={() => {
            toggleMenuHandler();
          }}
          className="h-8 cursor-pointer"
          src="https://cdn3.iconfinder.com/data/icons/minimal-website-ui-kit/100/ld_menu_closed-512.png"
          alt="menu"
        />
        <a href="/">
          <img
            className="h-11 mx-2"
            src={process.env.PUBLIC_URL + "/assets/logo-transparent-svg.svg"}
            alt="logo"
          />
        </a>
      </div>
      <div className=" flex col-span-10 mx-5 px-8 justify-center text-center">
        <div className="flex-col w-3/5">
          <div className="flex ">
            <input
              className=" w-4/5 p-2 border border-gray-400 rounded-l-full"
              type="text "
              value={searchTerm}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setShowSuggestion(false)}
              // onChange={(e) => setSearchQuery(e.target.value)}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={(e) => (
                setSearchTerm(e.target.value),
                getSearchSuggestion(e.target.value)
              )}
            />
            <button
              className="  border border-gray-400 p-2 rounded-r-full"
              placeholder="Search"
              onClick={() => {
                handleSearch(searchTerm);
              }}
            >
              🔍 Search
            </button>
          </div>
          {showSuggestion && suggestion && (
            <div className="fixed bg-white  w-[37rem] rounded-xl shadow-lg">
              <ul className=" ">
                {suggestion?.map((suggest) => (
                  <li
                    key={suggest.id}
                    // onClick={setSearchQuery(suggest)}
                    className="align-left px-5 py-2"
                  >
                    🔍{suggest}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex col-span-1 justify-end ">
        {/* <img
          className="h-8 m-1 mr-4"
          src="https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
          alt="user"
        /> */}
        <TypeA className=" " />
      </div>
    </div>
  );
};

export default Head;
