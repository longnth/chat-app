import React from "react";

export default function Channel(props) {
  return (
    <div
      className="channel-item"
      onClick={() => props.onSelectChannel(props.id)}
    >
      <div>{props.name}</div>
      <span>{props.participants}</span>
    </div>
  );
}
