const websockets = require("ws");
const wss = new websockets.WebSocketServer({ port: 3000 });
const Blockchain = require("./model/blockchain");

const block = [];

wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (msg) => {
    console.log(msg.toString());
    const data = JSON.parse(msg);
    switch (data.type) {
      case "found":
        mine(ws, data);
        break;
      case "start":
        ws.send(block.length);
        break;
      case "stop":
        ws.on("close", () => {
          console.log("ws closed");
        });
        ws.send("mining stoped");
        break;

      default:
        break;
    }
  });
  ws.on("error", (err) => {
    console.log("error");
    ws.send(err);
  });
});

const mine = async (ws, data) => {
  const serialNo = block.length;
  const uniqueID = crypto.randomUUID();
  const { token, senderAddress, receiverAddress, timeStamp, hash } = data;
  const Blockinfo = new Blockchain(
    token,
    senderAddress,
    receiverAddress,
    timeStamp,
    serialNo,
    uniqueID,
    //Transaction ID
    `${
      token +
      ": T=" +
      timeStamp +
      ":S=" +
      senderAddress +
      ":R=" +
      receiverAddress +
      ":Id=" +
      uniqueID
    }`,
    hash
  );
  block.push(Blockinfo.blockData);
  ws.send(block.length);
  console.log(block);
};

module.exports = wss;
