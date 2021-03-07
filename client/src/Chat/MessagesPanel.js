import React from "react";
import Message from "./Message";

export default function MessagesPanel(props) {
  var renderMessageList = () => {
    var { channel } = props;
    if (channel && channel.messages)
      return channel.messages.map((message, index) => {
        return (
          <Message
            key={index}
            id={message.id}
            senderName={message.senderName}
            text={message.text}
          />
        );
      });
    return (
      <div className="no-content-message">There is no message to show!</div>
    );
  };
  return (
    <div>
      <div className="messages-panel">
        <div className="messages-list">{renderMessageList()}</div>
        <div className="messages-input">
          <input type="text" />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
