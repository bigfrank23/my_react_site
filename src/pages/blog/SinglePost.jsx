import { Box, Button, IconButton, Popover, Typography, Pagination, Modal } from '@mui/material'
import React, { useRef } from "react";
import placeholderImg from '../../../src/placeholder.png'
import authorImg from "../../../src/author.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentSection from './CommentSection';
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, } from "react-share";
import moment from "moment";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { useParams, useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import Success from '../../components/alerts/Success';
import Fail from '../../components/alerts/Fail';
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
// import ThumbUpAlt from "@mui/icons-material/ThumbUpAltIcon";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { LikeButton } from '@lyket/react';
import AppC from './AppC';
import https from 'https'
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import socketIOClient from "socket.io-client";
import { myApi } from '../../components/requestMethod';


const user = JSON.parse(localStorage.getItem("profile"));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SinglePost = () => {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([]);
  // const [user, setUser] = useState([]);
  const [IP, setIP] = useState("");

  const location = useLocation();

  const [posts, setPosts] = useState([]); //Hooks for recommended posts

  const { id } = useParams();
  const history = useHistory();

  const [color, setColor] = useState("");

  const [comment, setComment] = useState("");
  const [commentImg, setCommentImg] = useState(null);

  const imgTagRef = useRef("");
  const inputTagRef = useRef("");
  const commentRef = useRef();

  const getCommentTime = moment().format("LLLL");
  const [viewed, setViewed] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");


   const [currentPage, setCurrentPage] = useState(1);
   const commentsPerPage = 5;

   const [openModal, setOpenModal] = useState(false);
   const handleOpen = () => setOpenModal(true);
   const handleClose = () => setOpenModal(false);

   const [likeCount, setLikeCount] = useState([]);
   const [likeFailed, setLikeFailed] = useState(false);

  useEffect(() => {
    // Check for the presence of the 'post_view' cookie
    if (document.cookie.indexOf("post_view") !== -1) {
      setViewed(true);
    } else {
      var headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
      // headers.append("Access-Control-Allow-Credentials", "true");
      headers.append("Accept", "application/json");
      // Increment the view count if the cookie is not present
      fetch(`https://my-react-site-api.onrender.com/api/posts/${id}/viewer`, {
        method: "GET",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: headers,
      }).catch((err) => console.error(err));
    }
  }, [id]);
  

  const getPost = async () => {
    const res = await myApi.get("/posts/" + id);
    setPost(res.data);
    setComments(res.data.comments);
    // setViews(id);
    setIsLoading(false);
    findUser();
    console.log(res.data);
  };

  const findUser = async () => {
    try {
      const res = await myApi.get(
        "/auth/" +
          JSON.parse(localStorage.getItem("profile"))?.result._id
      );
      // localStorage.setItem("profilePic", res.data.profilePic);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
    // setColor(Math.random().toString(16).substr(-6));
  }, [id, location]);

  const handleDelete = async (id) => {
    try {
      await myApi.delete("/posts/" + id);

      setIsSuccess(true);

      setTimeout(() => {
        history.push("/blog");
      }, 5000);
    } catch (error) {
      setIsFail(error.response.data.message);
    }
  };

  //For recommended posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await myApi.get("/posts/all");
      setPosts(res.data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openRecommendedPost = (id) => history.push(`${id}`); //Open recommened post when clicked

  const handleDrawer = () => setDrawer(!drawer);

  const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  const likeHandler = (id) => {
    if(user?.result){
      fetch("https://my-react-site-api.onrender.com/api/posts/like", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          userId: user?.result?._id || user?.result?.googleId,
          name: user?.result?.firstName || user?.result?.familyName,
          image: localStorage.getItem("profilePic"),
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          getPost();
          const newData = data.map((item) => {
            if (item._id == result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newData);
          console.log(newData);
          // setIsLiked(post?.likes?.length);
        })
        .catch((err) => {
          console.log(err);
        });

    }else{
      setLikeFailed('Please Signin')
    }
  };

  const unlikeHandler = (id) => {
    fetch("https://my-react-site-api.onrender.com/api/posts/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        // "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id,
        userId: user?.result?._id || user?.result?.googleId,
        name: user?.result?.firstName || user?.result?.familyName,
        image: localStorage.getItem("profilePic"),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getPost();
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
        console.log(newData);
        // setIsLiked(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const newPost = {
      text: newComment,
      user: user?.result?.firstName || user?.result?.name,
      profilePic: localStorage.getItem("profilePic"),
    };

    try {
      if (commentImg) {
        const formData = new FormData();
        const filename = Date.now() + commentImg.name;
        formData.append("name", filename);
        formData.append("commentImg", commentImg);
        newPost.commentImage = filename;

        try {
          await myApi.post("/upload", formData);
        } catch (error) {
          console.log(error);
        }
      }

      const response = await myApi.post(
        `/posts/${id}/my_comments`,
        newPost
      );
      // Update the comments array with the new comment
      setComments([response.data, ...comments]);
      setNewComment("");
      setCommentImg("");

      // setFileData("")
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // // Make API call to save the comment to the database
    // axios
    //   .post(`http://localhost:5000/api/posts/${id}/my_comments`, {
    //     newPost,
    //   })
    //   .then((response) => {
    //     // Update the comments array with the new comment
    //     setComments([response.data, ...comments]);
    //     setNewComment("");

    //     // Send a message to the WebSocket server with the new comment
    //     socket.emit("new comment", response.data);
    //   });
  };

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

   const handlePageChange = (event, page) => {
     setCurrentPage(page);
   };

   // Get current comments
   const indexOfLastComment = currentPage * commentsPerPage;
   const indexOfFirstComment = indexOfLastComment - commentsPerPage;
   const currentComments = comments.slice(
     indexOfFirstComment,
     indexOfLastComment
   );

  // Get page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }


  const handleLikeComment = (commentId) => {
    myApi
      .patch(
        `/posts/${id}/comments/${commentId}?action=like`,
        { userId: user?.result?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Update the comments state with the updated comment
        setComments(
          comments.map((comment) =>
            comment._id === commentId ? response.data : comment
          )
        );
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleUnlikeComment = (commentId) => {
    myApi
      .patch(
        `/posts/${id}/comments/${commentId}?action=unlike`,
        { userId: user?.result?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Update the comments state with the updated comment
        setComments(
          comments.map((comment) =>
            comment._id === commentId ? response.data : comment
          )
        );
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
      <Box
        component="section"
        sx={{
          display: { xs: "block", md: "flex" },
          flexDirection: "row-reverse",
          gap: "4rem",
          padding: { xs: "7rem 2rem 2rem 2rem", md: "10rem 10rem 2rem 5rem" },
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            component="main"
            sx={{ color: "#fff", flex: 4, mb: { xs: 7, md: 0 } }}
          >
            {isSuccess ? <Success /> : null}
            {isFail ? <Fail>{isFail}</Fail> : null}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography
                  variant="h3"
                  sx={{ fontSize: { xs: "1.7rem", md: "3rem" } }}
                >
                  {post.title}
                </Typography>
                <div>
                  <Box component="div" sx={{ display: "flex", gap: ".5rem" }}>
                    <AccessTimeIcon />
                    <Typography variant="caption">
                      {/* {moment(post.createdAt).fromNow()} */}
                      {moment(post.createdAt).format("LLLL")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "1rem", mb: 1 }}>
                    <Typography variant="body2" alignSelf="center">
                      Posted by
                    </Typography>
                    <Box>
                      {post.profilePic ? (
                        <Box
                          loading="lazy"
                          component="img"
                          src={post.profilePic}
                          borderRadius="50%"
                          width={50}
                          height={50}
                          border="3px solid darkslategrey"
                        />
                      ) : (
                        <PersonIcon sx={{ color: "#fff" }} />
                      )}
                      <Typography variant="body2" textAlign="center">
                        {post.username}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </div>
              <Box
                component="div"
                sx={{
                  display: "flex",
                  gap: ".5rem",
                  flexDirection: "row-reverse",
                }}
              >
                <IconButton
                  aria-label="settings"
                  sx={{ alignSelf: "start" }}
                  onClick={handleDrawer}
                >
                  <MoreVertIcon sx={{ color: "#fff" }} />
                </IconButton>
                {drawer ? (
                  <Box
                    sx={{
                      background: "#fff",
                      position: "absolute",
                      marginRight: "3rem",
                      padding: "1rem",
                      borderRadius: "3px",
                      alignSelf: "start",
                    }}
                  >
                    {user?.result?.googleId === post?.creator ||
                      (user?.result?._id === post?.creator && (
                        <>
                          <Link
                            to={`/updatePost/${post._id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                                background: "#1976d2",
                                padding: ".3rem",
                                borderRadius: "3px",
                                alignSelf: "start",
                                cursor: "pointer",
                              }}
                            >
                              <EditIcon
                                sx={{ fontSize: "14px", alignSelf: "center" }}
                              />
                              <Typography variant="caption">Edit</Typography>
                            </Box>
                          </Link>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "1rem",
                              justifyContent: "center",
                              background: "#f44336",
                              padding: ".3rem",
                              borderRadius: "3px",
                              marginTop: ".5rem",
                              cursor: "pointer",
                            }}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                          >
                            <DeleteIcon
                              sx={{ fontSize: "14px", alignSelf: "center" }}
                            />
                            <Typography variant="caption">Delete</Typography>
                          </Box>
                        </>
                      ))}
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: "center",
                        background: "transparent",
                        padding: ".3rem",
                        border: "1px solid skyblue",
                        borderRadius: "3px",
                        marginTop: ".5rem",
                        cursor: "pointer",
                      }}
                      onClick={handleOpen}
                    >
                      <ThumbUpIcon
                        sx={{
                          fontSize: "14px",
                          alignSelf: "center",
                          color: "#1976d2",
                        }}
                      />
                      <Typography variant="caption" color="primary">
                        Likes
                      </Typography>
                    </Box>
                    <Popover
                      id={open ? "simple-popover" : undefined}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={() => setAnchorEl(null)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Typography sx={{ p: 2 }}>Are you sure?</Typography>
                      <Box
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(post._id)}
                        >
                          <CheckCircleOutlineIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => setAnchorEl(null)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Box>
                    </Popover>
                    <Modal
                      open={openModal}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h6"
                          textAlign="center"
                        >
                          People that liked your post
                        </Typography>
                        {!post?.likes?.length ? (
                          <Typography
                            variant="subtitle1"
                            textAlign="center"
                            color="primary"
                          >
                            No Likes Yet!
                          </Typography>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              gap: ".5rem",
                              flexWrap: "wrap",
                              mt: 4,
                            }}
                          >
                            {post?.likes?.map((v) => (
                              <div key={v._id}>
                                {v.image ? (
                                  <Box
                                    component="img"
                                    src={v.image}
                                    alt={v.name}
                                    sx={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                      border: "thin solid #333",
                                    }}
                                  >
                                    <PersonIcon />
                                  </Box>
                                )}
                                <Typography
                                  variant="subtitle2"
                                  textAlign="center"
                                >
                                  {v.name}
                                </Typography>
                              </div>
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Modal>
                  </Box>
                ) : null}
              </Box>
            </Box>
            {post.avatar ? (
              <Box
                loading="lazy"
                component="img"
                src={post.avatar || placeholderImg}
                sx={{ width: "100%", height: { xs: "30%", md: "500px" } }}
                alt=""
              />
            ) : null}
            <Box
              component="div"
              mt={2}
              sx={{ borderBottom: "1px solid red", paddingBottom: "1rem" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 2rem",
                }}
              >
                <div className="reactions d-flex my-1" style={{ gap: "1rem" }}>
                  {!post?.views ? (
                    <VisibilityOffIcon />
                  ) : (
                    <div className="reactTime d-flex" style={{ gap: "5px" }}>
                      <VisibilityOutlinedIcon />
                      <span style={{ fontSize: "13px" }}>
                        {/* {post?.views?.length} */}
                        {post?.views}
                        {/* {views} */}
                      </span>
                    </div>
                  )}
                  <div className="reactComment d-flex" style={{ gap: "5px" }}>
                    <CommentIcon />
                    <span style={{ fontSize: "13px" }}>
                      {post?.comments?.length}
                    </span>
                  </div>
                  {!post?.likes.length ||
                  !post?.likes
                    ?.map((v) => v.userId)
                    ?.includes(user?.result?._id || user?.result?.googleId) ? (
                    <div
                      className="reactLike d-flex"
                      onClick={() => likeHandler(post._id)}
                      style={{ cursor: "pointer", gap: "5px" }}
                    >
                      {post?.likes
                        ?.map((v) => v.userId)
                        ?.includes(user?.result?._id) ? (
                        <ThumbUpIcon sx={{ color: "#065fd4" }} />
                      ) : (
                        <ThumbUpIcon />
                      )}
                      <span style={{ fontSize: "13px" }}>
                        {post?.likes?.length}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="reactLike d-flex"
                      onClick={() => unlikeHandler(post._id)}
                      style={{ cursor: "pointer", gap: "5px" }}
                    >
                      {" "}
                      <ThumbDownIcon />{" "}
                      <span style={{ fontSize: "13px" }}>
                        {post?.likes?.length}
                      </span>{" "}
                    </div>
                  )}
                </div>
                <>{likeFailed ? <Fail>{likeFailed}</Fail> : null}</>
                {user?.result && (
                  <div className="detail_share d-flex">
                    <FacebookShareButton
                      url={"#"}
                      quote={"post.title"}
                      hashtag={"#newpost"}
                      description={"post.desc"}
                      className="Demo__some-network__share-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={"#"}
                      quote={"post.title"}
                      hashtag={"#newpost"}
                      description={"post.desc"}
                      className="Demo__some-network__share-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={"#"}
                      quote={"post.title"}
                      hashtag={"#newpost"}
                      description={"post.desc"}
                      className="Demo__some-network__share-button"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    {/* <FacebookShareCount url={"https://pfn-lagos-state.netlify.app"}>
                        {shareCount => <span className="myShareCountWrapper">{shareCount}</span>}
                        </FacebookShareCount> */}
                  </div>
                )}
              </Box>
              <Typography variant="body1" mt={1}>
                {post.desc}
              </Typography>
            </Box>
              <CommentSection
                post={post}
                getPost={getPost}
                color={color}
                setCommentImg={setCommentImg}
                setComment={setComment}
                // handleComment={handleComment}
                currentPage={currentPage}
                pageNumbers={pageNumbers}
                commentImg={commentImg}
                comment={comment}
                commentRef={commentRef}
                currentComments={currentComments}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                newComment={newComment}
                commentImg={commentImg}
                setCommentImg={setCommentImg}
                handlePageChange={handlePageChange}
                handleLikeComment={handleLikeComment}
                handleUnlikeComment={handleUnlikeComment}
              />
          </Box>
        )}

        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            component="aside"
            sx={{ color: "#fff", flex: 1, marginTop: { xs: 0, md: "50%" } }}
          >
            <Typography variant="h5" fontWeight={700} mb={2} color="#fff">
              {!recommendedPosts.length ? "" : "Recommended"}
            </Typography>
            <Box component="main">
              {recommendedPosts
                // .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map((post) => (
                  <Box component="div" mb={3} key={post._id}>
                    <Typography variant="h6" mb={1}>
                      {post.title}
                    </Typography>

                    <Box sx={{ display: { xs: "flex", md: "block" } }}>
                      <Box sx={{ flex: 1 }}>
                        <Box
                          component="img"
                          src={post.avatar || placeholderImg}
                          sx={{ width: "100%" }}
                          alt=""
                        />
                      </Box>
                      <Box sx={{ flex: 2, padding: { xs: "0 1rem", md: 0 } }}>
                        <Typography
                          variant="body2"
                          sx={{ textAlign: { xs: "center", md: "left" } }}
                          className="ellipse"
                        >
                          {post.desc}
                        </Typography>
                        <Box
                          sx={{
                            textAlign: { xs: "center", md: "left" },
                            mt: 1,
                          }}
                        >
                          <Button
                            variant="contained"
                            component="primary"
                            onClick={() => openRecommendedPost(post._id)}
                          >
                            Read More
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SinglePost