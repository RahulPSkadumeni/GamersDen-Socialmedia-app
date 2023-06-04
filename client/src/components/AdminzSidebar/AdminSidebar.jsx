import React from "react";
import { Route } from "react-router-dom";
import "./Adminsidebar.css";

const AdminSidebar = () => {
  return (
    <div className="sideBar">
      <>
        <div className="adminpic">
          <div className="games">
            <img
              className="game"
              src="https://www.proctorgallagherinstitute.com/wp-content/uploads/2019/11/peter-brindely-pic-updated.jpg"
            />
          </div>
          <p className="AdminName">ADMIN </p>
        </div>
      </>
      Explore
      <>
        <div className="sidbarWrap">
          <ul className="sidebarList">
            <li className="SidebarListItem">
              <span className="SidebarListItemText">Dashboard</span>
            </li>
            <li className="SidebarListItem">
              <span href="/notification" className="SidebarListItemText">
                {" "}
                Gaming Updates
              </span>
            </li>
            <li className="SidebarListItem">
              <span className="SidebarListItemText">User Management</span>
            </li>
            <li className="SidebarListItem">
              <span className="SidebarListItemText">Inbox</span>
            </li>
            <li className="SidebarListItem">
              <span className="SidebarListItemText">Notification</span>
            </li>
            <li className="SidebarListItem">
              <span className="SidebarListItemText">Reports</span>
            </li>
          </ul>
        </div>
      </>
    </div>
  );
};

export default AdminSidebar;
