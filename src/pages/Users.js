import { Button, Input, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
        title: "User Name",
        dataIndex: "username",
        key: "username",
      },

      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Website",
        dataIndex: "website",
        key: "website",
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
 
  };
useEffect(()=>{
  setName(userId.name)
  setUserName(userId.username)
  setEmail(userId.email)
  setPhone(userId.phone)
  setWebsite(userId.website)
  console.log('userId: -------', userId);
},[userId])

  const handleOk = () => {
    setIsModalOpen(false);
    axios
    .put(`https://jsonplaceholder.typicode.com/posts/${userId.id}`, { })
    .then((response) => {
      console.log("Edit successfully!");
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((response) => {
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
      <Table dataSource={userData} columns={columns} style={{backgroundColor:"white"}}/>
      <Modal
        title="Edit Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       <span>Name</span> <Input onChange={(e)=>setName(e.target.value)} placeholder="Body" value={name}/>
       <span>UserName</span> <Input onChange={(e)=>setUserName(e.target.value)} placeholder="Body" value={userName}/>
        <span>Email</span><Input onChange={(e)=>setEmail(e.target.value)} placeholder="Body" value={email}/>
        <span>phone</span><Input onChange={(e)=>setPhone(e.target.value)} placeholder="Body" value={phone}/>
        <span>website</span><Input onChange={(e)=>setWebsite(e.target.value)} placeholder="Body" value={website}/>
      </Modal>

    </>
  );
};

export default Users;
