import React from "react";
import Channel from "./Channel";

export default function ChannelList(props) {
  var renderChannelList = () => {
    var { channels } = props;
    if (channels)
      return channels.map((channel, index) => {
        return (
          <Channel
            key={index}
            id={channel.id}
            name={channel.name}
            participants={channel.participants}
            onSelectChannel={props.onSelectChannel}
          />
        );
      });
    return <div>There is no channel to show!</div>;
  };

  return <div className="channel-list">{renderChannelList()}</div>;
}
