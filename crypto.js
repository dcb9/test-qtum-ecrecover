const Web3 = require('web3');
const web3 = new Web3();
const { PrivateKey, Networks } = require('qtumcore-lib');

// Qtum address is 'qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW'
// 
// /dapp # qcli gethexaddress qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW
// 7926223070547d2d15b2ef5e7383e541c338ffe9
const privateKey = PrivateKey.fromWIF('cRcG1jizfBzHxfwu68aMjhy78CpnzD9gJYZ5ggDbzfYD3EQfGUDZ');

const privateKeyHex = '0x' + privateKey.toString().padStart(64, '0');
console.log("private key:", privateKeyHex);

let message = "hi";
message = "\x19Ethereum Signed Message:\n" + message.length + message
const signature = web3.eth.accounts.sign(message,privateKeyHex);

console.log("message hash:", signature.messageHash);
console.log("signature:", signature.signature);

console.log("addr in ETH format:", web3.eth.accounts.recover(message, signature.signature));
