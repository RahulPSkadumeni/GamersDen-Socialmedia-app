import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { setLogout } from "../../pages/state";
import { useDispatch } from "react-redux";

export const TypeA = () => {
  const [activeDialog, setActiveDialog] = useState(false);
  const dispatch = useDispatch();
  const dialog = () => {
    setActiveDialog(true);
  };

  const CloseDialog = () => {
    setActiveDialog(false);
  };

  const defaultButton =
    "rounded-2xl py-2 px-4 shadow-md text-sm duration-300 active:bg-opacity-80 ease-in-out bg-[#1a5cff] md:text-sm text-white hover:shadow-md hover:shadow-blue-500/50 ";

  const buttonBorder =
    "rounded-xl py-2 px-4 shadow-md text-xl duration-300 border border-[#f6f6f6] active:bg-opacity-80 ease-in-out bg-transparent md:text-m text-[#f6f6f6] ";

  const buttonTransparent =
    "rounded-xl py-2 px-4 shadow-md text-sm duration-300 ease-in-out bg-blue-500 bg-opacity-30 md:text-sm text-[#] ";

  return (
    <>
      <div
        className={
          activeDialog
            ? "fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 "
            : "hidden"
        }
      >
        <div className="relative w-[15rem] md:w-[25rem] p-6 bg-emerald-700 shadow-lg rounded-xl">
          <div
            onClick={CloseDialog}
            className="absolute -top-1 -right-1 hover:top-0 hover:right-0 p-1.5 rounded-lg bg-white shadow-lg cursor-pointer duration-200"
          >
            <GrFormClose className="text-primary" />
          </div>
          <img
            className="mx-auto w-28 mb-2"
            src="https://media0.giphy.com/media/v8Vux9WxXcnXEnOGn1/giphy.gif?cid=ecf05e47zn1myog0zrkd309o2vq605ztag8vqqu9v1zguc7t&rid=giphy.gif&ct=s"
            alt=""
          />
          <div className="space-y-1 text-center text-primary">
            <h3 className="text-5xl font-semibold">Log out?</h3>
            <p className="text-xl">Are you sure? </p>
          </div>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <button
              onClick={() => dispatch(setLogout())} // Call the dispatch function directly
              className={buttonBorder}
            >
              Confirm
            </button>
            {/* <button className={buttonTransparent}>Scan pages</button> */}
          </div>
        </div>
      </div>
      <button onClick={dialog} className={defaultButton}>
        Logout
      </button>
    </>
  );
};
