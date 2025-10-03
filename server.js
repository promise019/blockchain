const express = require("express");
const app = express();
const port = 2000;
const websocket = require("ws");
const wss = new websocket.WebSocketServer({ port: 3000 });

module.exports = wss;

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
