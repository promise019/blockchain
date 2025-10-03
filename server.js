const websockets = require("ws");
const wss = new websockets.Server({ port: 3000 });
const Blockchain = require("./model/blockchain");
console.log("ws running");

const block = [];

wss.on("connection", (ws) => {
  console.log("connected");

  ws.on("message", (msg) => {
    // console.log(msg.toString());
    // 1. Convert the Buffer/message to a string
    const msgString = msg.toString();

    // 2. Check for empty/invalid data before attempting to parse
    if (!msgString || msgString.length === 0) {
      console.log("Received empty message.");
      return; // Exit early if the message is empty
    }

    let data;
    try {
      // 3. SAFELY parse the JSON
      data = JSON.parse(msgString);
    } catch (e) {
      // Log the error and the problematic message content
      console.error("JSON Parsing Error on message:", msgString);
      return; // Exit if the message is unparsable
    }

    switch (data?.type) {
      case "found":
        mine(ws, data);
        break;
      case "start":
        ws.send(
          JSON.stringify({
            type: "mine",
            // nonce: block.length,
            prevHash: block[block.length]?.hash || "00",
          })
        );
        break;
      case "stop":
        ws.send("mining stoped");
        break;
      case "":
        console.log("Incorrect Data");
        break;

      default:
        // console.log("Incorrect Data");
        break;
    }
  });
  ws.on("error", (err) => {
    console.log("error");
    ws.send(err);
  });
  ws.on("close", () => {
    console.log("ws closed");
  });
});

const mine = async (ws, data) => {
  const serialNo = block.length;
  const uniqueID = crypto.randomUUID();
  const {
    token,
    senderAddress,
    receiverAddress,
    timeStamp,
    hash,
    prevHash,
    nonce,
  } = data;
  const Blockinfo = new Blockchain(
    token,
    senderAddress,
    receiverAddress,
    timeStamp,
    serialNo + 1,
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
    hash,
    prevHash,
    nonce
  );
  block.push(Blockinfo.blockData);
  ws.send(block.length);
  console.log(block);
};

// module.exports = wss;
