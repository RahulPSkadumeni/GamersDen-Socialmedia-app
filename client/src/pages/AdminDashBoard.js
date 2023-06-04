import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BodyComponent from "../components/Body/BodyComponent";
import UserList from "../components/UserList/UserList";
import { setAdminLogout } from "../pages/state";
const AdminDashBoard = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => dispatch(setAdminLogout())}
          className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-200 p-6">
        <UserList />
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4 px-6">
        &copy; 2023 My Company
      </div>
    </div>
  );
};

export default AdminDashBoard;
