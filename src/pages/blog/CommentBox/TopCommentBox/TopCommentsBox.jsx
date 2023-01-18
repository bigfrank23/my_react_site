import React, { useRef, useState } from 'react'
import './CommentBox.css'

import { useMainContext } from '../../Context/Context';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const TopCommentsBox = (props) => {
  const { setMessageReset, setCommentIncrement } = useMainContext();

  const {id} = useParams()
  const message = useRef(null);
  //Trigger the underline animation
  const [showCommentLine, setCommentLine] = useState(false);
  //True onFocus. False onCancel
  const [showButton, setShowButton] = useState(false);
  //True on input data, False when input is blank
  const [enableBtn, setEnableBtn] = useState(true);

  //when they click o the input, Show the underline and the buttons
  const commentFocus = () => {
    setCommentLine(true);
    setShowButton(true);
  };

  //when they click o the input, Hide the underline
  const commentFocusOut = () => {
    setCommentLine(false);
  };

  //if input value isn't empty then enable the comment Btn
  const commentStroke = (e) => {
    if (e.target.value) {
      setEnableBtn(false);
    } else {
      setEnableBtn(true);
    }
  };

  //send comment
  const sendComment = (e) => {
    e.preventDefault()
    fetch(`http://localhost:5000/api/comments/new-comment`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ messageData: message.current.value }),
    }).then((a) => {
      console.log(a);
      //reset entire comments and matching incremet counter
      setMessageReset((prevState) => !prevState);
      setCommentIncrement(10);
      //Delet Text input, update comment and disable comment btn
      message.current.value = "";
      setEnableBtn(true);
    });
  }

  return (
    <Box
      component="section"
      sx={{
        background: "#333",
        padding: { xs: "1rem", md: "1rem 10rem 1rem 1rem" },
        marginTop: "3rem",
      }}
    >
      <div>
        <h2>Comments</h2>
      </div>
      {/* <Typography variant="h6" olor="#fff" mb={1}>
        Drop Your Comments
      </Typography> */}
      <div className="col-lg-12 col-md-12 col-sm-12">
        <form>
          <section className="commentBox">
            <textarea
              cols="30"
              rows="4"
              style={{width: '100%', outline: 0}}
              autoFocus={props.autoFocus}
              placeholder="Add a public comment"
              ref={message}
              onFocus={commentFocus}
              onBlur={commentFocusOut}
              onKeyUp={commentStroke}
            />
            {/* Underline begins here */}
            {showCommentLine && <div className="commentLine"></div>}
          </section>
          {showButton && (
            <>
              <button
                className="commentButton sendButton"
                onClick={sendComment}
                disabled={enableBtn}
              >
                Comment
              </button>
              <button
                className="commentButton"
                style={{ color: "gray", background: "transparent" }}
                onClick={() => {
                  setShowButton(false);
                  message.current.value = "";
                }}
              >
                Cancel
              </button>
            </>
          )}
        </form>

      </div>
      </Box>
  );
}

export default TopCommentsBox;