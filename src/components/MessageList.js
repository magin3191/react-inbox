import React from 'react';
import Message from './Message'

const MessageList = ({messages, toggleRead, toggleCheck, toggleStar}) => {
  return (
    <div>
      {messages.map(message => (<Message key = {message.id} message={message}
      toggleRead={toggleRead} toggleCheck={toggleCheck} toggleStar={toggleStar}/>))}
    </div>

  )
}

export default MessageList
