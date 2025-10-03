const websockets = require("ws");
const readline = require("readline");

//create server input and output interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ws = new websockets("ws:/localhost:3000");

ws.on('open', ()=>{
    console.log('connected to server')
    promptMessage()
})

ws.on('message', (msg)=>{
    console.log(msg)
})

ws.on('error', (err)=>{
    console.log(err)
    ws.send(err)
})

ws.on('close', ()=>{
    console.log('server closed')
    ws.send('server closed')
    process.exit(0)
})

function promptMessage() {
  rl.question('input question or input "exit" to quit', (msg) => {
    if (msg.toLowerCase() === "exit") {
      rl.close();
      ws.close();
      return;
    }

    ws.send(msg);
    promptMessage();
  });
}
