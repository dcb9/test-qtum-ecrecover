const Web3 = require('web3');
const web3 = new Web3();
const { PrivateKey, Networks } = require('qtumcore-lib');

// Qtum address is 'qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW'
// 
// /dapp # qcli gethexaddress qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW
// 7926223070547d2d15b2ef5e7383e541c338ffe9
const privateKey = PrivateKey.fromWIF('cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk');

const privateKeyHex = '0x' + privateKey.toString().padStart(64, '0');

let message = "hi";
message = "\x19Ethereum Signed Message:\n" + message.length + message
const signature = web3.eth.accounts.sign(message,privateKeyHex);

console.log("message hash:", signature.messageHash);
console.log("signature:", signature.signature);
