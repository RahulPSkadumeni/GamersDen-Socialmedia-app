import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import GroupPages from "./pages/GroupPages/GroupPages";
import GroupPage from "./pages/Groups/GroupPage";

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Otp_login from "./pages/Otp_login";
import Profilepage from "./pages/Profilepage/Profilepage";
import Notification from "./pages/Notification/Notifications";

import Register from "./pages/Register";
import ErrorPage from "./error-page";
//theme select//
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { themeSettings } from "./theme";
import NewPost from "./pages/admin/postpage";
import Test from "./pages/testpage/Test";
import ChatContainer from "./components/ChatContainer/Chat/ChatContainer";
import Chat from "./pages/Chat/Chat";
import EditProfilepage from "./pages/EditProfilepage/EditProfilepage";
import GroupHome from "./pages/Groups/GroupPage";
import ChangePassword from "./pages/ChangePassword";
import NewPassword from "./pages/NewPassword";
import SearchResult from "./components/SearchResult";
import AdminLogin from "./pages/AdminLogin";
import AdminDashBoard from "./pages/AdminDashBoard";
const AppRouter = () => {
  const mode = useSelector((state) => state.mode);

  const isAuth = Boolean(useSelector((state) => state.token));
  const isAdmin = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/changepassword"
          element={!isAuth ? <ChangePassword /> : <Navigate to="/" />}
        />
        <Route
          path="/newPassword/:ph"
          element={!isAuth ? <NewPassword /> : <Navigate to="/" />}
        />
        <Route path="/otp_login" element={<Otp_login />} />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <Profilepage /> : <Navigate to="/" />}
        />
        <Route
          path="/editProfile/:userId"
          element={isAuth ? <EditProfilepage /> : <Navigate to="/" />}
        />
        <Route
          path="/groups"
          element={isAuth ? <GroupPages /> : <Navigate to="/" />}
        />
        <Route
          path="/group/home/:groupId"
          element={isAuth ? <GroupHome /> : <Navigate to="/" />}
        />
        <Route
          path="/SearchResult"
          element={isAuth ? <SearchResult /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={isAuth ? <Notification /> : <Navigate to="/" />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/DashBoard"
          element={
            isAdmin ? <AdminDashBoard /> : <Navigate to="/admin/login" />
          }
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
