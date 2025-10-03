class Blockchain {
  constructor(
    token,
    senderAddress,
    receiverAdress,
    timeStamp,
    serialNo,
    uniqueID,
    TransactionID,
    hash
  ) {
    this.token = token;
    this.senderAddress = senderAddress;
    this.receiverAdress = receiverAdress;
    this.timeStamp = timeStamp;
    this.serialNo = serialNo;
    this.uniqueID = uniqueID;
    this.TransactionID = TransactionID;
    this.hash = hash;
  }

  get blockData() {
    return {
      token: this.token,
      senderAddress: this.senderAddress,
      receiverAdress: this.receiverAdress,
      timeStamp: this.timeStamp,
      serialNo: this.serialNo,
      uniqueID: this.uniqueID,
      TransactionID: this.TransactionID,
      hash: this.hash,
    };
  }
}


module.exports = Blockchain