import React, { useRef, useState } from "react";
import { useOpenReply } from "../../Message/Message";
import { useMainContext } from "../../Context/Context";

const SubCommentBox = (props) => {
  const { setMessageUpdate } = useMainContext();

  const changeOpenReply = useOpenReply();

  const message = useRef(null);
  //Trigger the underline animation
  const [showCommentLine, setShowCommentLine] = useState(false);
  //True onFocus. False onCancel
  const [showButton, setShowButton] = useState(false);
  //True on input data, False when input is blank
  const [enableBtn, setEnableBtn] = useState(true);

  //when they click o the input, Show the underline and the buttons
  const commentFocus = () => {
    setShowCommentLine(true);
    setShowButton(true);
  };

  //when they click o the input, Hide the underline
  const commentFocusOut = () => {
    setShowCommentLine(false);
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
    e.preventDefault();
    fetch("http://localhost:5000/api/comment/new-sub-comment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        messageId: props.parentKey,
        messageData: message.current.value,
      }),
    }).then(() => {
      setMessageUpdate([1, props.parentKey]);
    });
  };

  return (
    <form>
      <section className="commentBox">
        <input
          type="text"
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
              changeOpenReply();
            }}
          >
            Cancel
          </button>
        </>
      )}
    </form>
  );
};

export default SubCommentBox;
