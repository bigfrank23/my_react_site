import { Avatar, Backdrop, Badge, Box, Button, Fade, IconButton, InputAdornment, Link, Modal, TextField, Toolbar, Typography } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GoogleIcon from "@mui/icons-material/Google";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useEffect, useRef, useState } from "react";
import {NavLink, useHistory, useLocation} from 'react-router-dom'
import styled from 'styled-components';
import decode from "jwt-decode";

import { GoogleLogin } from "react-google-login";
import {gapi} from "gapi-script";
import axios from "axios";
import Fail from "./alerts/Fail";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Axios, publicRequest } from "./requestMethod";

const NvaMenuStyles = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 18px;
  width: 100%;
  padding: 1rem 0;
  background-color: #262626;
  ul {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    width: 90px;
    text-align: center;
    li {
      display: inline-block;
      border-radius: 8px;
      transition: 0.3s ease background-color;
      &:hover {
        background: #1e1e1e;
        border-bottom: 2px solid #f0725c;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    a {
      font-family: Poppins, sans-serif;
      padding: 1rem 1rem;
      font-size: 2rem;
      color: #bcb4b4;
      outline: 0;
      text-decoration: none;
    }
    .active {
      color: #fff;
    }
  }
  .mobile-menu-icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 4rem;
    cursor: pointer;
    outline: 0;
    display: none;
  }
  .closeNavIcon {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    .hide-Item {
      transform: translateY(calc(-100% - var(--top)));
    }
    .mobile-menu-icon {
      display: block;
      * {
        pointer-events: none;
      }
    }
    .navItems {
      --top: 1rem;
      transition: 0.3s ease transform;
      background: #1e1e1e;
      padding: 2rem;
      width: 100%;
      max-width: 300px;
      border-radius: 12px;
      position: absolute;
      right: 1rem;
      top: var(--top);
      display: block;
      .closeNavIcon {
        display: block;
        width: 3rem;
        margin: 0 0 0 auto;
        cursor: pointer;
        * {
          pointer-events: none;
        }
      }
      li {
        margin-bottom: 1rem;
      }
    }
  }
`;
const faCol = {color: '#fff', fontSize: '2rem'}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialState = {
  email: "",
  password: "",
};

function NavMenu({ totalItems }) {
  const [showNav, setShowNav] = useState(false);

  const [open, setOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const history = useHistory();

  const [profileImage, setProfileImage] = useState([]);

  // const user = localStorage.getItem("profile") !== undefined ? JSON.parse(localStorage.getItem("profile")) : null
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : null
  );
  const [error, setError] = useState("");

  //  console.log(user.result.familyName);

  const handleOpen = () => {
    setOpen(true);
    setSignupModalOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    setSignupModalOpen(false);
  };

  const handleSignupModal = () => {
    setOpen(false);
    setSignupModalOpen(true);
  };

  const signupModalClose = () => {
    setOpen(false);
    setSignupModalOpen(false);
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleShowPassword2 = () => setShowPassword2(!showPassword2);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    // console.log(res);

    try {
      localStorage.setItem("profile", JSON.stringify({ result, token }));
      // console.log(res);
      setOpen(false);
      setSignupModalOpen(false);
      // window.location.replace('/')
      window.location.reload()
      // history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later");
    // alert("Google Sign In was unsuccessful. Try again later");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON?.parse(localStorage?.getItem("profile")));
  }, [location]);

  const findUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/" +
          JSON.parse(localStorage.getItem("profile"))?.result._id
      );
      localStorage.setItem("profilePic", res.data.profilePic);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProfilePic = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/auth/" + user?.result?._id
      );
      setProfileImage(res.data);
      findUser();
    };
    getProfilePic();
  }, [user?.result?._id, location, profileImage]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("profilePic");
    history.push("/");
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const res = await publicRequest.post("/signin", formData);
      setFormData(res.data);
      localStorage.setItem("profile", JSON.stringify(res.data));
      setOpen(false);
      findUser();
      // history.replace();
      history.reload()
    } catch (error) {
      setError(error.response.data.message);
      //  console.log(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Form validation

  // SignupForm validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(6, "Last Name must be at least 6 characters")
      .max(20, "Last Name must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (data) => {
      // console.log(JSON.stringify(data, null, 2));
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/signup",
          data
        );
        localStorage.setItem("profile", JSON.stringify(res.data));
        setSignupModalOpen(false);
        history.replace();
      } catch (error) {
        setError(error.response.data.message);
        //  console.log(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    },
  });

  return (
    <NvaMenuStyles>
      <div className="container-fluid">
        <div
          className="mobile-menu-icon"
          onClick={() => setShowNav(!showNav)}
          role="button"
          onKeyDown={() => setShowNav(!showNav)}
          tabIndex={0}
        >
          <i class="fa fa-bars" style={faCol}></i>
        </div>
        <ul className={!showNav ? "navItems hide-Item" : "navItems"}>
          <div
            className="closeNavIcon"
            onClick={() => setShowNav(!showNav)}
            role="button"
            onKeyDown={() => setShowNav(!showNav)}
            tabIndex={0}
          >
            <i className="fa fa-times" style={faCol}></i>
          </div>
          <li>
            <NavLink
              to="/"
              exact
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="about"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              About
            </NavLink>
          </li>
          {/* <li>
              <NavLink
                to="services"
                onClick={() => setShowNav(!showNav)}
                role="button"
                onKeyDown={() => setShowNav(!showNav)}
                tabIndex={0}
              >
                Services
              </NavLink>
            </li> */}
          <li>
            <NavLink
              to="projects"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              onClick={() => setShowNav(!showNav)}
              role="button"
              onKeyDown={() => setShowNav(!showNav)}
              tabIndex={0}
            >
              Contact
            </NavLink>
          </li>
          {/* <li> */}
          {/* {location.pathname !== '/cart' &&  */}
            <IconButton
              sx={{ alignSelf: "start" }}
              component={NavLink}
              to="/cart"
              aria-label="Show cart item"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart sx={{ color: "#fff" }} />
              </Badge>
            </IconButton>
          {/* } */}
          {/* </li> */}
          {/* <li> */}
          <Toolbar
            sx={{
              color: "#fff",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {user ? (
              <Box
                sx={{
                  color: "#fff",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <NavLink to="/updateProfilePhoto" style={{ padding: 0 }}>
                  <Avatar
                    sx={{ margin: "auto" }}
                    alt={user?.result?.familyName}
                    src={user?.result?.imageUrl || profileImage?.profilePic}
                  >
                    {user?.result?.familyName?.charAt(0) ||
                      user?.result?.firstName?.charAt(0)}
                  </Avatar>
                </NavLink>
                <Typography
                  variant="caption"
                  sx={{ textTransform: "capitalize" }}
                >
                  {user?.result?.name ||
                    user?.result?.firstName + " " + user?.result?.lastName}
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<LogoutIcon />}
                  size="small"
                  color="error"
                  onClick={handleLogout}
                  sx={{ fontSize: ".6rem", height: "20px" }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  endIcon={<LoginIcon />}
                  onClick={handleOpen}
                  // sx={{display: 'block'}}
                >
                  sign in
                </Button>
              </div>
            )}
          </Toolbar>
          {/* </li> */}
        </ul>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              component="form"
              // onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
            >
              {error ? <Fail>{error}</Fail> : null}
              <Box display="flex" justifyContent="center">
                <Avatar>
                  <LockIcon />
                </Avatar>
              </Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                fontWeight={700}
                textAlign="center"
                mb={2}
                component="h2"
              >
                Fill in your credetials
              </Typography>
              <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    name="email"
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    label="Email"
                    type="email"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    name="password"
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                  />
                </div>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  endIcon={<LoginIcon />}
                  type="submit"
                  onClick={handleSignin}
                >
                  Sign in
                </Button>
                <GoogleLogin
                  clientId="867846486968-4c47kerjous6c3ebeugos9rlag7dalug.apps.googleusercontent.com"
                  plugin_name="Franklin's site"
                  render={(renderProps) => (
                    <Button
                      color="error"
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      endIcon={<GoogleIcon />}
                      variant="contained"
                      sx={{ marginTop: "5px" }}
                    >
                      Sign In with Google
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleError}
                  cookiePolicy="single_host_origin"
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "block" }}>
                    <Typography variant="subtitle2" fontWeight={700} mt={2}>
                      Don't have an account?
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{ alignSelf: "center", mt: 2 }}
                      onClick={handleSignupModal}
                    >
                      Sign up
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <Typography>Forgot password?</Typography>
                    <Button
                      variant="contained"
                      sx={{ alignSelf: "center", mt: 2 }}
                      endIcon={<LockResetIcon />}
                    >
                      click here
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Sign up */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={signupModalOpen}
        onClose={signupModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupModalOpen}>
          <Box sx={style}>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              noValidate
            >
              {error ? <Fail>{error}</Fail> : null}
              <Box display="flex" justifyContent="center">
                <Avatar>
                  <LockIcon />
                </Avatar>
              </Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                fontWeight={700}
                textAlign="center"
                mb={2}
                component="h2"
              >
                Fill in your credetials
              </Typography>
              <Box display="flex" gap="1rem" marginBottom="1rem">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    name="firstName"
                    onChange={formik.handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    label="First Name"
                    color={formik.errors.firstName ? "error" : "primary"}
                    InputProps={
                      formik.errors.firstName && {
                        endAdornment: (
                          <InputAdornment position="end">
                            <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                          </InputAdornment>
                        ),
                      }
                    }
                  />
                  <Typography variant="caption" color="red">
                    {formik.errors.firstName ? formik.errors.firstName : null}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    name="lastName"
                    onChange={formik.handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    label="Last Name"
                    color={formik.errors.lastName ? "error" : "primary"}
                    InputProps={
                      formik.errors.lastName && {
                        endAdornment: (
                          <InputAdornment position="end">
                            <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                          </InputAdornment>
                        ),
                      }
                    }
                  />
                  <Typography variant="caption" color="red">
                    {formik.errors.lastName ? formik.errors.lastName : null}
                  </Typography>
                </div>
              </Box>
              <Box
                component="div"
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    name="email"
                    onChange={formik.handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    label="Email"
                    type="email"
                    color={formik.errors.email ? "error" : "primary"}
                    InputProps={
                      formik.errors.email && {
                        endAdornment: (
                          <InputAdornment position="end">
                            <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                          </InputAdornment>
                        ),
                      }
                    }
                  />
                  <Typography variant="caption" color="red">
                    {formik.errors.email ? formik.errors.email : null}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    name="password"
                    onChange={formik.handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    color={formik.errors.password ? "error" : "primary"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {formik.errors.password ? (
                            <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                          ) : (
                            <IconButton onClick={handleShowPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="caption" color="red">
                    {formik.errors.password ? formik.errors.password : null}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <TextField
                    onChange={formik.handleChange}
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword2 ? "text" : "password"}
                    color={formik.errors.confirmPassword ? "error" : "primary"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {formik.errors.confirmPassword ? (
                            <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                          ) : (
                            <IconButton onClick={handleShowPassword2}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography variant="caption" color="red">
                    {formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : null}
                  </Typography>
                </div>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%" }}
                  endIcon={<LoginIcon />}
                  type="submit"
                  // onClick={handleSignup}
                >
                  Sign up
                </Button>
                <Button
                  color="error"
                  fullWidth
                  // disabled
                  endIcon={<GoogleIcon />}
                  variant="contained"
                  sx={{ marginTop: "5px" }}
                >
                  Sign In with Google
                </Button>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Typography variant="subtitle2" fontWeight={700} mt={2}>
                    Already have an account?
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ alignSelf: "center", mt: 2 }}
                    onClick={handleOpen}
                  >
                    Sign in
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </NvaMenuStyles>
  );
}

export default NavMenu
