import React from "react";
import { useState, useContext } from "react";

const MainContext = React.createContext();

export function useMainContext() {
  return useContext(MainContext);
}

const ContextProvider = (props) => {
  //The state that will allow us to trigger, either an UPDATE or DELETE request of an individual comment
  const [messageUpdate, setMessageUpdate] = useState(false);
  /** This state that holds the current increment value. This is used by the intersection observer when we fetch 
  new comments */
  const [commentIncrement, setCommentIncrement] = useState(10);

  //This state boolean will change when we post a new comment to refresh the new 10 messages
  const [messageReset, setMessageReset] = useState(false);

  const value = {
    messageReset,
    setMessageReset,
    messageUpdate,
    setMessageUpdate,
    commentIncrement,
    setCommentIncrement,
  };
  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
};

export default ContextProvider;
