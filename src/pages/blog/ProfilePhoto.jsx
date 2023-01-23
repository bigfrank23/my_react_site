import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React, { useState, useRef} from 'react'
import profileImg from '../../../src/user.png'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem("profile"));
const ProfilePhoto = () => {
    const [fileData, setFileData] = useState('')
    const [success, setSuccess] = useState('')

    const imgTagRef = useRef('')
    const inputTagRef = useRef('')

     const handleSubmit = async (e) => {
       e.preventDefault();

       try {
        const res = await axios.put(
           "https://my-react-site-api.onrender.com/api/auth/" +
             JSON.parse(localStorage.getItem("profile")).result._id,
           { profilePic: fileData }
         );
         setSuccess(res.data)
         
         console.log(res.data);
         setFileData('')
         
        } catch (error) {
          console.log(error);
          setSuccess(error)
        //  setError(true);
        //  setTimeout(() => {
        //    setError(false);
        //  }, 5000);
       }
     };

     const importFileAndPreview = () => {
      var reader = new FileReader()

      console.log(reader);
      reader.addEventListener('load', ()=> {
        imgTagRef.current.src = reader.result

        setFileData(reader.result)
      })

      if (inputTagRef.current.files[0]) {
        reader.readAsDataURL(inputTagRef.current.files[0]);
      }
      console.log(inputTagRef.current.files[0]);
     }

  return (
    <Container
      sx={{
        marginTop: "10rem",
        background: "#f8f9fa",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ padding: "1rem 4rem" }}>
        <Typography variant="h6" textAlign="center">
          Update Profile Photo
        </Typography>
        <Box
          component="label"
          htmlFor="fileInput"
          sx={{ width: "300px", height: "300px", my: 2 }}
        >
          <Box
            ref={imgTagRef}
            component="img"
            src={fileData || profileImg}
            alt=""
            sx={{ borderRadius: "50%", width: "100%", height: "100%" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            ref={inputTagRef}
            id="fileInput"
            component="input"
            type="file"
            placeholder="Image"
            accept="image/*"
            onChange={importFileAndPreview}
            sx={{display: 'none'}}
          />
          <Button
            variant="contained"
            endIcon={<FileUploadIcon />}
            onClick={handleSubmit}
          >
            upload
          </Button>
          <Typography variant='caption' mt={1} textAlign='center'>{success}</Typography>
        </Box>

      </Paper>
    </Container>
  );
}

export default ProfilePhoto