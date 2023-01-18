import React from 'react'
import MessageScroll from './MessageScroll'
import TopCommentsBox from './CommentBox/TopCommentBox/TopCommentsBox';

//main context
import ContextProvider from './Context/Context'

const AppC = ({post}) => {
  return (
    <ContextProvider>
      <div style={{background: '#fff', width: '100%'}}>
          <TopCommentsBox autoFocus={false} />
          <div style={{padding: "0 2rem"}}>
          <MessageScroll post={post} />
          </div>
      </div>
    </ContextProvider>
  )
}

export default AppC