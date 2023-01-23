import React, { useState, useEffect} from "react";
// import "../newsFeed/NewsFeedForm.css";
import { Form } from "react-bootstrap";
import { Container, Typography, Button } from "@mui/material";
// import axios from 'axios'
import SendIcon from "@mui/icons-material/Send";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Success from "../../components/alerts/Success";
import "./createPost.css";
import Fail from "../../components/alerts/Fail";

const EditPost = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ title: "", desc: "", image: "" });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const [updatedPost, setUpdatedPost] = useState({}); //For update

  const [text, setText] = useState("");

  const history = useHistory();

   const { id } = useParams();


  //for update
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://my-react-site-api.onrender.com/api/posts/" + id
      );
      setUpdatedPost(res.data);
      setIsLoading(false);
    //   console.log(res.data);
    };
    getPost();
  }, [id]);

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("desc", data.desc);

      // const r = updatedPost._id.slice(0, -3)

      // console.log(updatedPost._id);
      // console.log(id);

      const res = await axios.put(
        "https://my-react-site-api.onrender.com/api/posts/" + id,
        formData
      );
    //   const res = await fetch(
    //     `http://localhost:5000/api/posts/${id}}`,
    //     {
    //         method: 'POST',
    //         body: formData
    //     }
    //   );
      setData(res.data);
      setData({ title: "", desc: "", image: "" });
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        history.push("/blog");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ marginTop: "7rem", background: "#fff", padding: "2rem" }}>
      {isSuccess ? <Success /> : null}
      {isFail ? <Fail>{isFail}</Fail> : null}
      <Typography color="#fff">Create A Post</Typography>
      <div className="adminFormBox">
        <div className="adminFormBoxContent">
          <Form className="adminFormBoxContentRight">
            <Form.Group className="mb-3">
              <div>
                <Form.Label htmlFor="file">Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Image"
                  accept="image/*"
                  name="image"
                  onChange={handleChange("image")}
                  required
                />
              </div>
              {data.image ? 
              (
                <img
                  className="writeImg"
                  src={URL.createObjectURL(data.image)}
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "1rem",
                    borderRadius: "5px",
                  }}
                />
              ) :
              (
                <img
                  className="writeImg"
                  src={updatedPost.avatar}
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "1rem",
                    borderRadius: "5px",
                  }}
                />
              )
              }
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                defaultValue={updatedPost.title}
                autoFocus
                onChange={handleChange("title")}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                type="text"
                placeholder="Description"
                name="desc"
                defaultValue={updatedPost.desc}
                onChange={handleChange("desc")}
              />
            </Form.Group>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            //   disabled={isLoading}
              endIcon={<SendIcon />}
            >
              Update
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default EditPost;
