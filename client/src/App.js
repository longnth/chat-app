import React from "react";
import socketClient from "socket.io-client";

const SERVER = "http://127.0.0.1:8080";

const App = () => {
  var socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log("I am connected to server");
  });
  return <div>This is App page!</div>;
};

export default App;
