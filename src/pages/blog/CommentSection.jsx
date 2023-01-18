import {
  Box,
  Typography,
  Button,
  Avatar,
  InputAdornment,
  TextField,
  TextareaAutosize,
  IconButton,
  Paper,
  Pagination,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import React, {useRef, useState} from 'react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditor }from "@ckeditor/ckeditor5-react";
import parse from "html-react-parser";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import './CommentSection.css'
import axios from "axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import FileBase from "react-file-base64";
import { useEffect } from "react";

import pImage from '../../../src/profile.jpg'


const user = JSON.parse(localStorage.getItem("profile"));
const CommentSection = ({
  post,
  getPost,
  color,
  setCommentImg,
  setComment,
  comment,
  commentImg,
  handleComment,
  commentRef,
  currentComments,
  handleSubmit,
  handleChange,
  newComment,
  pageNumbers,
  currentPage,
  handlePageChange,
  handleLikeComment,
  handleUnlikeComment
}) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(post?.comments);

  // const [fileData, setFileData] = useState({ profilePic: "" });
  // const [data, setData] = useState({ message: "", commentImg: ""});
  const [getUser, setGetUser] = useState([]);
  const [fileData, setFileData] = useState("");

  const PF = "http://localhost:5000/images/";

  const [noOfElement, setNoOfElement] = useState(4);

  const slice = comments?.slice(0, noOfElement);

  const [likeList, setLikeList] = useState(false);

  const findUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/" +
          JSON.parse(localStorage.getItem("profile"))?.result._id
      );
      setGetUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getPost();
  // } , [comment]);

  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };

  // const importFileAndPreview = () => {
  //   var reader = new FileReader();

  //   console.log(reader);
  //   reader.addEventListener("load", () => {
  //     imgTagRef.current.src = reader.result;

  //     setFileData(reader.result);
  //   });

  //   if (inputTagRef.current.files[0]) {
  //     reader.readAsDataURL(inputTagRef.current.files[0]);
  //   }
  //   console.log(inputTagRef.current.files[0]);
  // };

  const handleCommentLike = async (cId) => {
    const res = await axios.put(
      "http://localhost:5000/api/posts/add-comment-like",
      {
        // userPic: JSON.parse(localStorage.getItem("profilePic")),
        cId: cId,
        userName: JSON.parse(localStorage.getItem("profile"))?.result
          ?.firstName,
      }
    );
    console.log(res);
  };

  // slice[slice?.length - 1];

  return (
    <Box
      component="section"
      sx={{
        background: "#333",
        padding: { xs: "1rem", md: "1rem 0rem 0 1rem" },
        marginTop: "3rem",
      }}
    >
      {/* <div>
        <h2>Comments</h2>
        <p>{parse(text)}</p>
      </div> */}
      {/* <Typography variant="h6" olor="#fff" mb={1}>
        Drop Your Comments
      </Typography> */}
      <div className="col-lg-12 col-md-12 col-sm-12">
        {!user?.result ? <h6>Login to like & comment</h6> : <h2>Comments</h2>}
        {!currentComments.length && "No Comment Yet"}
        {currentComments?.map((c, i) => (
          <div className="commentCard" key={i}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* <Avatar sx={{ width: "30px", height: "30px" }} /> */}
              <Avatar
                sx={{ width: "30px", height: "30px" }}
                alt={user?.result?.familyName}
                src={user?.result?.imageUrl || c?.profilePic}
              >
                {user?.result?.familyName?.charAt(0) ||
                  user?.result?.firstName?.charAt(0)}
              </Avatar>
            </div>
            <div style={{ display: "flex" }}>
              <div className="shape" />
              <div className="commentCardContent">
                <span
                  style={{
                    textTransform: "capitalize",
                    fontSize: ".9rem",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "rgb(105, 75, 143)",
                    // color: '#' + color
                  }}
                >
                  {c.user}
                </span>
                <div className="commentImg my-2">
                  {c.commentImage && (
                    <img
                      src={PF + c.commentImage}
                      // src={c.commentImage}
                      alt=""
                      width={100}
                      height={110}
                    />
                  )}
                </div>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <p className="commentBody" style={{ margin: "0 !important" }}>
                    {c.text}
                  </p>
                  {user?.result ? (
                    <Box sx={{ alignSelf: "end" }}>
                      {c?.likes?.includes(user?.result?._id || user?.result?.googleId) ? (
                      <Box onClick={()=> handleUnlikeComment(c._id)} fontSize="10px">
                        <ThumbUpIcon sx={{ fontSize: "small", color: '#1976d2', cursor: 'pointer' }} />
                        {c?.likes?.length}
                      </Box>

                      ) : (
                      <Box onClick={()=> handleLikeComment(c._id)} fontSize="10px">
                        <ThumbUpIcon sx={{ fontSize: "small", cursor: 'pointer' }} />
                        {c?.likes?.length}
                      </Box>
                      )}
                    </Box>

                  ) : (

                    <Box sx={{ alignSelf: "end" }}>
                      <Box fontSize="10px">
                        <ThumbUpIcon sx={{ fontSize: "small"}} />
                        {c?.likes?.length}
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box
                  component="div"
                  sx={{ display: "flex", gap: ".5rem", color: "gray" }}
                >
                  <AccessTimeIcon
                    sx={{ fontSize: "x-small", alignSelf: "center" }}
                  />
                  <Typography variant="caption">
                    {moment(c.date).fromNow()}
                  </Typography>
                </Box>
              </div>
            </div>
          </div>
        ))}
      </div>
        
        {/* {currentComments.length > 5 &&  */}
        <div className="pagination justify-content-center">
          <Pagination
            sx={{ background: "#fff", p: 1, borderRadius: "5px", m: 2 }}
            count={pageNumbers.length}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
        {/* } */}

        {user?.result && (
        <div className="editor text-dark d-flex flex-column">
          <Box sx={{ position: "relative", display: "flex", background: "#fff" }}>
            <textarea
              style={{
                padding: ".3rem",
                outline: 0,
                marginTop: "1rem",
                position: "relative",
                width: "100%",
                border: "none",
                resize: "none",
              }}
              id=""
              cols="30"
              rows="3"
              value={newComment}
              // onChange={(e) => setComment(e.target.value)}
              onChange={handleChange}
              placeholder="Type a message..."
              class="typing-box"
              spellCheck="false"
            />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                paddingRight: ".3rem",
              }}
            >
              {commentImg && (
                <img
                  className="writeImg"
                  src={URL.createObjectURL(commentImg)}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    marginTop: "1rem",
                    borderRadius: "5px",
                  }}
                />
              )}
              {/* <Box
                ref={imgTagRef}
                component="img"
                src={fileData || ""}
                alt=""
                sx={{
                  width: "100px",
                  height: "100px",
                  marginTop: "1rem",
                  borderRadius: "5px",
                }}
              /> */}
              <Box
                component="label"
                htmlFor="inputFile"
                sx={{ alignSelf: "end" }}
              >
                {/* <IconButton> */}
                <InsertPhotoIcon />
                {/* </IconButton> */}
              </Box>
              <Box
                id="inputFile"
                component="input"
                type="file"
                placeholder="Image"
                accept="image/*"
                sx={{ display: "none" }}
                onChange={(e) => setCommentImg(e.target.files[0])}
              />
              {/* <Box
                ref={inputTagRef}
                id="inputFile"
                component="input"
                type="file"
                placeholder="Image"
                accept="image/*"
                onChange={importFileAndPreview}
                sx={{ dispimport { Typography } from '@mui/material/Typography';
  lay: "none" }}
              /> */}
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{ my: 1 }}
            endIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={!newComment && !commentImg}
          >
            Send
          </Button>
        </div>

        )}
    </Box>
  );
};

export default CommentSection