class Blockchain {
  constructor(
    token,
    senderAddress,
    receiverAddress,
    timeStamp,
    serialNo,
    uniqueID,
    TransactionID,
    hash,
    prevHash,
    nonce
  ) {
    this.token = token;
    this.senderAddress = senderAddress;
    this.receiverAddress = receiverAddress;
    this.timeStamp = timeStamp;
    this.serialNo = serialNo;
    this.uniqueID = uniqueID;
    this.TransactionID = TransactionID;
    this.hash = hash;
    (this.prevHash = prevHash), (this.nonce = nonce);
  }

  get blockData() {
    return {
      token: this.token,
      senderAddress: this.senderAddress,
      receiverAddress: this.receiverAddress,
      timeStamp: this.timeStamp,
      serialNo: this.serialNo,
      uniqueID: this.uniqueID,
      TransactionID: this.TransactionID,
      hash: this.hash,
      prevHash: this.prevHash,
      nonce: this.nonce,
    };
  }
}

module.exports = Blockchain;
