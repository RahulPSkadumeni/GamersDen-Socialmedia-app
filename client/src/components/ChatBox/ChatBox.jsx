import React, { useEffect, useState } from "react";
import { addMessage, getMessages } from "../../api/MesssageApi/messageApi";
import { getUser } from "../../api/usersApi/user";
import "./ChatBox.css";
// import { format } from "timeago.js";
import TimeAgo from "react-timeago";
import InputEmoji from "react-input-emoji";
import { useRef } from "react";
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUser);

    try {
      const getUserData = async () => {
        const data = await getUser(userId);

        setUserData(data);
      };
      if (chat != null) getUserData(userId);
    } catch (error) {
      console.log(error);
    }
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    const receiverId = chat.members.find((id) => id !== currentUser);

    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    // <div className="fixed" style={{ width: "63%", height: "100%" }}>
    //   <div class="">
    //     {chat ? (
    //       <div>
    //         {" "}
    //         <div className="" style={{ height: "100vh" }}>
    //           <div className=" bg-emerald-700 rounded-t-2xl   ">
    //             <div className="flex m-4 p-4 overflow-hidden ">
    //               <img
    //                 className=" rounded-full"
    //                 src={
    //                   userData?.profilePicture
    //                     ? process.env.REACT_APP_PUBLIC_FOLDER +
    //                       userData.profilePicture
    //                     : "https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
    //                 }
    //                 alt="Profile"
    //                 style={{ width: "50px", height: "50px" }}
    //               />
    //               <div
    //                 className="text-white font-semibold"
    //                 style={{ fontSize: "0.9rem" }}
    //               >
    //                 <span className="text-lg ml-5">
    //                   {userData?.firstName} {userData?.lastName}
    //                 </span>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="">
    //             <div className="chat-body overflow-y-scroll ">
    //               {messages.map((message) => (
    //                 <div
    //                   ref={scroll}
    //                   className={
    //                     message.senderId === currentUser
    //                       ? "message own"
    //                       : "message"
    //                   }
    //                 >
    //                   <span>{message.text}</span>{" "}
    //                   <TimeAgo date={new Date(message.createdAt).getTime()} />
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //           {/* <div className=" chat-sender ml-5 bg-gray-400   absolute  bottom-0 w-7/12">
    //         <div>+</div>
    //         <InputEmoji value={newMessage} onChange={handleChange} />
    //         <div
    //           className=" button mt-3 text-teal-50 font-medium bg-blue-300 rounded-full "
    //           onClick={handleSend}
    //         >
    //           Send
    //         </div>
    //         <input
    //           type="file"
    //           value={""}
    //           name=""
    //           id=""
    //           style={{ display: "none" }}
    //         />
    //       </div> */}
    //           {/* chat-sender */}

    //           {/* className= */}
    //         </div>
    //         <div>
    //           <div className=" chat-sender ml-5 bg-gray-400   absolute  bottom-0 w-7/12">
    //             <div>+</div>
    //             <InputEmoji value={newMessage} onChange={handleChange} />
    //             <div
    //               className=" button mt-3 text-teal-50 font-medium bg-blue-300 rounded-full "
    //               onClick={handleSend}
    //             >
    //               Send
    //             </div>
    //             <input
    //               type="file"
    //               value={""}
    //               name=""
    //               id=""
    //               style={{ display: "none" }}
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <span className="chatbox-empty-message">
    //         Tap on a chat to start conversation...
    //       </span>
    //     )}
    //   </div>
    // </div>

    <div class="fixed" style={{ width: "63%", height: "100%" }}>
      <div className="  bg-emerald-700 rounded-t-2xl   ">
        <div className="flex m-4 p-4 overflow-hidden ">
          <img
            className=" rounded-full"
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : "https://i.pinimg.com/564x/cf/fc/1d/cffc1d6458cfeae198045145673b351b.jpg"
            }
            alt="Profile"
            style={{ width: "50px", height: "50px" }}
          />
          <div
            className="text-white font-semibold"
            style={{ fontSize: "0.9rem" }}
          >
            <span className="text-lg ml-5">
              {userData?.firstName} {userData?.lastName}
            </span>
          </div>
        </div>
      </div>
      <div className="fixed" style={{ width: "63%", height: "100%" }}>
        <div className="">
          {chat ? (
            <div>
              <div className="" style={{ height: "100vh" }}>
                {/* ... other code ... */}
                <div
                  className="chat-body overflow-y-scroll"
                  style={{ height: "calc(100vh - 150px)" }}
                >
                  {messages.map((message) => (
                    <div
                      ref={scroll}
                      className={
                        message.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message.text}</span>{" "}
                      <TimeAgo date={new Date(message.createdAt).getTime()} />
                    </div>
                  ))}
                </div>
                {/* ... other code ... */}
              </div>
              <div>
                <div className="chat-sender ml-5 bg-gray-400 absolute bottom-0 w-7/12">
                  {/* ... other code ... */}
                </div>
              </div>
            </div>
          ) : (
            <span className="chatbox-empty-message">
              Tap on a chat to start a conversation...
            </span>
          )}
        </div>
      </div>
      <div className=" fixed bottom-0  chat-sender ml-5 bg-gray-400  w-7/12">
        <div>+</div>
        <InputEmoji value={newMessage} onChange={handleChange} />
        <div
          className=" button mt-3 text-teal-50 font-medium bg-blue-300 rounded-full "
          onClick={handleSend}
        >
          Send
        </div>
        <input
          type="file"
          value={""}
          name=""
          id=""
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
