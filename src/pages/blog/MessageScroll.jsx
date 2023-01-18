import React, { useState, useEffect, useRef } from "react";
import Message from "./Message/Message";
import "./App.css";
//main context
import { useMainContext } from "./Context/Context";
import { useParams } from "react-router-dom";

const MessageScroll = ({post}) => {
  const { id } = useParams();
  //When bool from main context changes, Re-render message list
  const { messageReset, commentIncrement, setCommentIncrement, messageUpdate } =
    useMainContext();

  //Make sure increment value in callback  function for intersection observer is up to date
  const commentIncrementRef = useRef(commentIncrement);

  const [messages, setMessages] = useState([]);
  const [showBottomBar, setShowBottomBar] = useState(true);

  //Load up the first 10 comments, Do this either on application start or when a new commet is posted
  useEffect(() => {
    setShowBottomBar(true);

    fetch("http://localhost:5000/api/comments/get-data", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ limitNum: 10 }),
    })
      .then((res) => res.json())
      .then((comments) => {
        setMessages(comments);
      });
  }, [messageReset]);

  // //Either update or delete an individual comment
  useEffect(() => {
    if (messageUpdate) {
      //if messageUpdate[0] is 1, that means we update, else we delete
      if (messageUpdate[0] === 1) {
        fetch("http://localhost:5000/api/comments/update-comment", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ commentId: messageUpdate[1] }),
        })
          .then((res) => res.json())
          .then((commentData) => {
            updateComment(commentData);
          });
      } else if (messageUpdate[0] === 2) {
        deleteComment();
      }
    }
  }, [messageUpdate]);

  function updateComment(commentData) {
    let currentMessage = [...messages];
    if (commentData) {
      let currentMessageIndex = currentMessage.findIndex(
        (message) => message._id === commentData._id
      );
      currentMessage.splice(currentMessageIndex, 1, commentData);
      setMessages(currentMessage);
    }
  }

  function deleteComment() {
    let currentMessage = [...messages];
    let currentMessageIndex = currentMessage.findIndex(
      (message) => message._id === messageUpdate[1]
    );
    currentMessage.splice(currentMessageIndex, 1);
    setMessages(currentMessage);
  }

  //Intersection Observer
  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        fetch("http://localhost:5000/api/comments/get-more-data", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            commentIncrement: commentIncrementRef.current,
          }),
        })
          .then((res) => res.json())
          .then((comments) => {
            if (comments.length > 0) {
              setTimeout(() => {
                setMessages((prevState) => [...prevState, ...comments]);
              }, 3000);
            } else {
              setTimeout(() => {
                setShowBottomBar(false);
              }, 3000);
            }

            //We use comments.length just icase there are not 10 comments left
            setCommentIncrement((prevState) => (prevState += comments.length));
          });
      }
    }),
    { threshold: 1 }
  );

  //Ensure comment Increment is up to date
  useEffect(() => {
    commentIncrementRef.current = commentIncrement;
  }, [commentIncrement]);

  //bottomBar will contain the bottomBar JSX Increment
  const [bottomBar, setBottomBar] = useState(null);

  useEffect(() => {
    const currentBottomBar = bottomBar;
    const currentObserver = observer.current;

    if (currentBottomBar) {
      currentObserver.observe(currentBottomBar);
    }
    return () => {
      if (currentBottomBar) {
        currentObserver.unobserve(currentBottomBar);
      }
    };
  }, [bottomBar]);

  return (
    <>
      {messages.map((message) => (
        <Message
          key={message._id}
          useKey={message._id}
          user={message.user}
          editable={message.editable}
          message={message.message}
          likes={message.likes}
          replies={message.replies}
        />
      ))}
      {messages.length > 9 && showBottomBar ? (
        <div className="buttonBar" ref={setBottomBar}>
          <div className="loader"></div>
        </div>
      ) : null}
    </>
  );
};

export default MessageScroll;
