import React, { useRef, useState, useContext } from "react";
import CommentBox from './../CommentBox/CommentBox';
import "./Message.css";
import SubMessage from "./SubMessage/SubMessage";
import { useMainContext } from "../Context/Context";

const showReply = React.createContext();

export function useOpenReply() {
  return useContext(showReply);
}

const Message = (props) => {
  const { setMessageUpdate } = useMainContext();

  const likeIcon = useRef();
  const nonLike = useRef();

  const [arrowup, setArrowup] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  //Toggled when cancel or reply btn clicked
  const changeOpenReply = () => {
    setOpenReply((prevState) => (prevState = !prevState));
  };

  //Toogle arrow up & down
  let arrow = <i className="fa fa-caret-down" />;

  const changeArrow = () => {
    setArrowup((prevState) => (prevState = !prevState));
  };
  if (arrowup) {
    arrow = <i className="fa fa-caret-up" />;
  } else {
    arrow = <i className="fa fa-caret-down" />;
  }

  //like message
  let toggleLike = false;
  let likes = props.likes;

  const likeComment = () => {
    toggleLike = !toggleLike;

    if (toggleLike) {
      likes++;
      likeIcon.current.style.color = "#065fd4";
    } else {
      likes--;
      likeIcon.current.style.color = "gray";
    }
    nonLike.current.innerHTML = likes;

    //Store this new value in the data base
    fetch("http://localhost:5000/api/comments/update-like", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        messageId: props.useKey,
        likes: likes,
      }),
    });
  };

  const deleteMessage = () => {
    fetch("http://localhost:5000/api/comments/delete-comment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        messageId: props.useKey,
      }),
    }).then(() => {
      setMessageUpdate([2, props.useKey]);
    });
  };

  return (
    <>
      <section className="messageContainer">
        <div className="messageUser">{props.user}</div>
        <i className="fa fa-user-circle" aria-hidden="true"></i>
        <div className="messageText">{props.message}</div>
        <section className="messageIconContainer">
          <i
            className="fa fa-thumbs-up"
            aria-hidden="true"
            ref={likeIcon}
            onClick={likeComment}
          />
          <div ref={nonLike}>{props.likes}</div>
          <i className="fa fa-reply" aria-hidden="true"></i>
          {!props.editable ? (
            <div style={{ cursor: "pointer" }} onClick={changeOpenReply}>
              Reply
            </div>
          ) : (
            <div style={{ cursor: "pointer" }} onClick={deleteMessage}>
              <i
                className="fa fa-trash"
                style={{ color: "red" }}
                aria-hidden="true"
              ></i>
            </div>
          )}
        </section>
        <showReply.Provider value={changeOpenReply}>
          {openReply && <CommentBox autoFocus={true} useKey={props.useKey} />}
        </showReply.Provider>
        {props.replies.length > 0 && (
          <section className="arrowReplies" onClick={changeArrow}>
            {arrow}
            <div>View {props.replies.length} replies</div>
          </section>
        )}
        {arrowup && (
          <section className="subMessages">
            {props.replies.map((reply) => (
              <SubMessage
                key={Math.random()}
                parentKey={props.useKey}
                subId={reply._id}
                user={reply.user}
                message={reply.message}
                likes={reply.likes}
              />
            ))}
          </section>
        )}
      </section>
    </>
  );
};

export default Message;
