import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatContainer from "../../components/ChatContainer/Chat/ChatContainer";
import Contact from "../../components/Contact/Contact";
import HeaderComponent from "../../components/HeaderComponent";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import "./chat.css";
import { userChats } from "../../api/chatApi/chatRequest";
import { Controller } from "react-hook-form";
import Conversation from "../../components/conversation/Conversation.js";
import NavIcons from "../../components/NavIcons/NavIcons";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { useRef } from "react";
import { SideNaveBar } from "../../components/SideNavbar/SideNavebar";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const socket = useRef();
  console.log("sett chattttt", chats);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
        console.log("data of chat available user", data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
    console.log("first chats", chats);
  }, [user]);

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      console.log(" userrrrrrrrrrrrrrrrrrrrrrr", users);
      setOnlineUsers(users);
      console.log(
        onlineUsers,
        "VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
        onlineUsers
      );
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("sending messages from client");
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  //onlone user status
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <div>
      <>
        <HeaderComponent />
        <div className="flex">
          <SideNaveBar />
          <div className="  w-9/12  ">
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
            {/* <div> */}
            {/* <div
             style={{ width: "20rem", display: "flex", alignSelf: "flex-end" }}
            > */}
            {/* <NavIcons /> */}
            {/* </div> */}
            {/* </div> */}
          </div>
          {/* Right Side */}

          <div className="  w-3/12">
            {/* <LogoSearch /> */}
            <div className=" ">
              <h2 className="chats text-black flex flex-col  h-screen bg-gray-200">
                Chats
                <div className="mt-3 Chat-list ">
                  {chats.map((chat) => (
                    <div
                      onClick={() => {
                        setCurrentChat(chat);
                      }}
                    >
                      <Conversation
                        data={chat}
                        currentUser={user._id}
                        online={checkOnlineStatus(chat)}
                      />
                    </div>
                  ))}
                </div>
              </h2>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
