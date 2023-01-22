import React, { useState } from "react";
// import "../newsFeed/NewsFeedForm.css";
import { Form } from "react-bootstrap";
import { Container, Typography, Button } from "@mui/material";
// import axios from 'axios'
import SendIcon from "@mui/icons-material/Send";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Success from "../../components/alerts/Success";
import './createPost.css'
import Fail from "../../components/alerts/Fail";
import { publicRequest } from "../../components/requestMethod";
import FileBase from 'react-file-base64'
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import {myApi} from '../../components/requestMethod'

const user = JSON.parse(localStorage.getItem('profile'))
const CreatePost = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ title: "", desc: "", image: "", profilePic: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [getUser, setGetUser] = useState([]);

  const [text, setText] = useState("");

  const history = useHistory();

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const findUser = async () => {
    try {
      const res = await myApi.get(
        "/auth/" + JSON.parse(localStorage.getItem("profile"))?.result._id
      );
      setGetUser(res?.data);
      // setIsLoading(false);
      // localStorage.setItem("profilePic", res.data.profilePic);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (data?.image) {
      try {
        let formData = new FormData();
        formData.append("image", data?.image);
        formData.append("title", data?.title);
        formData.append("desc", data?.desc);
        formData.append("username", user.result.firstName || user.result.name);
        formData.append("profilePic", getUser.profilePic);
        // formData.append("userId", user.result._id);
  
        const res = await myApi.post(
          "/posts/",
          formData
        );
        console.log(res?.data);
        setData(res?.data);
        setData({ title: "", desc: "", image: "" });
        setIsLoading(false);
        setIsSuccess(true);
  
        setTimeout(() => {
          history.push("/blog");
        }, 5000);
      } catch (error) {
        setIsFail(error.response?.data?.message);
        setIsLoading(false);
        console.log(error);
      }
    }else{
      try {
        const res = await myApi.post(
          "/posts/create",
          {
            profilePic: getUser.profilePic,
            username: user.result.firstName || user.result.name,
            title: data?.title,
            desc: data?.desc,
            // userId: user.result._id,
          }
          // formData
        );
        console.log(res.data);
        setData(res.data);
        setData({ title: "", desc: ""});
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          history.push(`/fullDetail/${res.data._id}`);
          // history.push("/blog");
        }, 5000);
      } catch (error) {
        setIsFail(error?.response?.data?.message);
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <Container sx={{ marginTop: {xs: '3rem', sm: '10rem'}, background: "#fff", padding: "2rem" }}>
      {isSuccess ? <Success /> : null}
      {isFail ? <Fail>{isFail}</Fail> : null}
      <Typography color="#fff">Create A Post</Typography>
      <div className="adminFormBox">
        <div className="adminFormBoxContent">
          <Form className="adminFormBoxContentRight">
            <Form.Group className="mb-3">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Form.Label htmlFor="file">Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Image"
                  accept="image/*"
                  name="image"
                  onChange={handleChange("image")}
                />
              </div>
              {data?.image && (
                <img
                  className="writeImg"
                  src={URL.createObjectURL(data?.image)}
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "1rem",
                    borderRadius: "5px",
                  }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={data?.title}
                onChange={handleChange("title")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                placeholder="Description"
                name="desc"
                value={data?.desc}
                onChange={handleChange("desc")}
              />
            </Form.Group>
            <Button
              size="small"
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              disabled={data?.title === "" && data?.desc === '' && data?.image === ''}
              endIcon={
                isLoading ? (
                  ""
                ) : (
                  <SendIcon />
                )
              }
            >
              {isLoading ? 'Creating...' : 'Post'}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default CreatePost;
