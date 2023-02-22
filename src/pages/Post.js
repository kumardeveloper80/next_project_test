import { Button, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Post = () => {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const columns = [
    {
      title: "userId",
      dataIndex: "userId",
      key: "userid",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div>
            <Button onClick={()=>{showModal();setUserId(record)}}>Edit</Button>
            <Button onClick={() => handleDelete(record.id)}>Delete</Button>
          </div>
        );
      },
    },
  ];



  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setTitle(userId.title)
    console.log('userId: -------', userId);
    setBody(userId.body)
  };
useEffect(()=>{
  setTitle(userId.title)
  console.log('userId: -------', userId);
  setBody(userId.body)
},[userId])
  const handleOk = () => {
    setIsModalOpen(false);

    axios
    .put(`https://jsonplaceholder.typicode.com/posts/${userId.id}`, {
      title: title,
      body: body,
    })
    .then((response) => {
      console.log("Edit successfully!");
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("userId: ", userId);
  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((response) => {
      setUserData(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    console.log("id: ", id);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        console.log("deleted successfully!");
      });
  };



  return (
    <>
    {/* <Button onClick={}>Rediret User</Button> */}
      <Table dataSource={userData} columns={columns} style={{backgroundColor:"white"}}/>
      <Modal
        title="Edit Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input onChange={(e)=>setTitle(e.target.value)} placeholder="Title" value={title} style={{marginBottom:"10px"}}/>
        <Input onChange={(e)=>setBody(e.target.value)} placeholder="Body" value={body}/>
      </Modal>
    </>
  );
};

export default Post;
