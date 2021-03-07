import React, { useState, useEffect } from "react";
import socketClient from "socket.io-client";
import ChannelList from "./ChannelList";
import MessagesPanel from "./MessagesPanel";

import "./chat.css";

const SERVER = "http://127.0.0.1:8080";

export default function Chat() {
  let socket = socketClient(SERVER);
  socket.on("connection", (value) => {
    console.log("I am connected to server");
  });

  // socket.on("channel", (channel) => {
  //   let channelList = channels;
  //   channelList.forEach((c) => {
  //     if (c.id === channel.id) {
  //       c.participants = channel.participants;
  //     }
  //   });
  //   setChannels(channelList);
  // });

  const [channels, setChannels] = useState([
    {
      id: 1,
      name: "first",
      participants: 10,
    },
  ]);
  const [id, setId] = useState(0);

  const loadChannel = async () => {
    console.log("load channel running!");
    fetch("http://localhost:8080/getChannels").then(async (response) => {
      let data = await response.json();
      setChannels(data.channels);
    });
  };

  const handleChannelSelect = (id) => {
    // setId(id);
    socket.emit("channel-join", id, (ack) => {});
  };

  const handleSelectedChannel = () => {
    socket.on("channel", (channel) => {
      let channelList = channels;
      channelList.forEach((c) => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      setChannels(channelList);
    });
  };

  useEffect(() => {
    loadChannel();
  }, []);

  useEffect(() => {
    handleSelectedChannel();
  }, [channels]);

  // const [channels, setChannels] = useState(null);
  // const [socket, setSocket] = useState(null);
  // const [channel, setChannel] = useState(null);

  // useEffect(() => {
  //   loadChannels();
  //   configureSocket();
  // });

  // const loadChannels = async () => {
  //   console.log("load channel running!");
  //   fetch("http://localhost:8080/getChannels").then(async (response) => {
  //     let data = await response.json();
  //     setChannels(data.channels);
  //   });
  // };

  // const configureSocket = () => {
  //   var socket = socketClient(SERVER);
  //   socket.on("connection", () => {
  //     if (channel) {
  //       handleChannelSelect(channel.id);
  //     }
  //   });

  //   socket.on("channel", (channel) => {
  //     let channels = channels;
  //     channels.forEach((c) => {
  //       if (c.id === channel.id) {
  //         c.participants = channel.participants;
  //       }
  //     });
  //     setChannels(channels);
  //   });

  //   socket.on("message", (message) => {
  //     let channels = channels;
  //     channels.forEach((c) => {
  //       if (c.id === message.channel_id) {
  //         if (!c.messages) c.messages = [message];
  //         else c.message.push(message);
  //       }
  //     });
  //   });

  //   setSocket(socket);
  // };

  // const handleChannelSelect = (id) => {
  //   let channel = channels.find((c) => {
  //     return c.id === id;
  //   });
  //   setChannel(channel);
  //   socket.emit("channel-join", id, (ack) => {});
  // };

  // const handleSendMessage = (channel_id, text) => {
  //   socket.emit("send-message", {
  //     channel_id,
  //     text,
  //     senderName: socket.id,
  //     id: Date.now(),
  //   });
  // };

  return (
    <div className="chat-app">
      <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
      <MessagesPanel />
    </div>
  );
}
