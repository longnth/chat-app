var app = require("express");
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const PORT = 8080;

http.listen(PORT, () => {
  console.log(`listening on port *: ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("new client connected!");
  socket.emit("connection", null);
});
