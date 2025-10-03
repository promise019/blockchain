const Blockchain = require("../model/blockchain");
const wss = require("../server");

const mine = new Blockchain();

const block = []

wss.on("connection", (ws) => {
  console.log("connection successful");
  ws.on('message', (msg)=>{
    if (msg === 'start miner') {
        
    }
  })
});
