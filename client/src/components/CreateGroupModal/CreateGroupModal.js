import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/axios";
// import { setPosts } from "../state";
function CreateGroupModal() {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [image, setImage] = useState(null);
  //   const [post, setPost] = useState("someID");
  const token = useSelector((state) => state.token);
  //   const preloadedValues = { ...user };

  const [caption, setCaption] = useState("someID");

  const [showModal, setShowModal] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object to send the form data with the image
    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("description", description);
    formData.append("avatar", avatar);

    try {
      // Send a POST request to the server to create the new group
      const response = await Axios.post(`group/create/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <button
        className="m-3 p-3  rounded-3xl bg-pink-900  hover:bg-lime-700"
        onClick={toggleModal}
      >
        Open Modal
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create Group</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="groupName">Group Name:</label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <label htmlFor="avatar">Avatar:</label>
              <input type="file" id="avatar" onChange={handleAvatarChange} />

              <button type="submit">Create Group</button>
            </form>

            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateGroupModal;
