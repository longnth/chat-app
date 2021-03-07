var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const PORT = 8080;
var STATIC_CHANNELS = [
  { id: 1, name: "global chat", participants: 0, sockets: [] },
  { id: 2, name: "funny", participants: 0, sockets: [] },
];

http.listen(PORT, () => {
  console.log(`listening on port *: ${PORT}`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS,
  });
});

io.on("connection", (socket) => {
  console.log("new client connected!");
  socket.emit("connection", null);
  socket.on("channel-join", (id) => {
    console.log("channel-join ", id);
    STATIC_CHANNELS.forEach((channel) => {
      if (channel.id === id) {
        if (channel.sockets.indexOf(socket.id) == -1) {
          channel.sockets.push(socket.id);
          channel.participants++;
          io.emit("channel", channel);
        }
        console.log("if: ", channel);
      } else {
        let index = channel.sockets.indexOf(socket.id);
        if (index != -1) {
          channel.sockets.splice(index, 1);
          channel.participants--;
          io.emit("channel", channel);
        }
        console.log("else: ", channel);
      }
    });
    return id;
  });

  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    STATIC_CHANNELS.forEach((c) => {
      let index = c.sockets.indexOf(socket.id);
      if (index != -1) {
        c.sockets.splice(index, 1);
        c.participants--;
        io.emit("channel", c);
      }
    });
  });
});
