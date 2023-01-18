import React, { useRef, useState, useContext } from "react";
import SubCommentBox from './../../CommentBox/SubCommentBox/SubCommentBox';
import { useMainContext } from "../../Context/Context";

const showReply = React.createContext();
export const useOpenReply = () => {
  return useContext(showReply);
};

const SubMessage = (props) => {
  const { setMessageUpdate } = useMainContext();

  const likeIcon = useRef();
  const nonLike = useRef();

  const [openReply, setOpenReply] = useState(false);

  //Toggled when cancel or reply btn clicked
  const changeOpenReply = () => {
    setOpenReply(!openReply);
  };

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

    fetch("http://localhost:5000/api/comments/update-sub-like", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        messageId: props.parentKey,
        subId: props.subId,
        likes: likes,
      }),
    });
  };

  const deleteMessage = () => {
    fetch("http://localhost:5000/api/comments/delete-sub-comment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        messageId: props.parentKey,
        subId: props.subId,
      }),
    }).then(() => {
      setMessageUpdate([1, props.parentKey]);
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
          {/* <i className="fa fa-thumbs-down" aria-hidden="true"></i> */}
          {props.user !== "Super Franklin" ? (
            <div
              style={{ cursor: "pointer", display: "none" }}
              onClick={changeOpenReply}
            >
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
          {openReply && (
            <SubCommentBox autoFocus={true} parentKey={props.parentKey} />
          )}
        </showReply.Provider>
      </section>
    </>
  );
};

export default SubMessage;
