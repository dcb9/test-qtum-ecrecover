1. install requires && run qtum 

```
$ npm install
$ docker run -it --rm \
  --name myapp \
  -v `pwd`:/dapp \
  -p 13889:3889 \
  -d \
  hayeah/qtumportal
```

2. import account and prefund

```
$ alias qcli='docker exec -it myapp qcli'

$ qcli importprivkey "cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk" # addr=qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW hdkeypath=m/88'/0'/1'

$ qcli getaddressesbyaccount ''
[
  "qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW",
  "qcnCSEtN4nXXo2Zin3TRpFeFNWgUkmhHnX"
]

$ qcli generate 600 &>/dev/null

$ docker exec -it myapp solar prefund qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW 100
sendmanywithdupes txid: d53d89c2a4a8eb259f15fad07ab6cdaa395eb419767c234e55dea5af496bd2ea
```

3. deploy contracts

```
$ export QTUM_RPC=http://qtum:test@localhost:13889

$ solar deploy --force MyAddress.sol

exec: solc [MyAddress.sol --combined-json bin,metadata --optimize --allow-paths /Users/bob/Documents/dcb9/test-qtum-ecrecover]
cli gasPrice 40 40
🚀  All contracts confirmed
   deployed MyAddress.sol => a7316edf371e01bbc2939efee987fdd314ac913e
```

4. sign a message via Web3

```
$ cat crypto.js # to see the JavaScript code

$ node crypto.js
message hash: 0x241dc4a7f2a142cfed20b64bb75a6f9a177ef3d0b534e8885ff90d41e9acae5d
signature: 0xd51633c43b38e2898c0733e44d333da707087810412df3a1b9c583676027a45f14d7561d803644b873aa7a1d6ec5fafacc9cac7c048320927c68c9f4bf588a301b
```

5. send transaction and get signer

```
$ solar encode MyAddress.sol recoverAddress '["241dc4a7f2a142cfed20b64bb75a6f9a177ef3d0b534e8885ff90d41e9acae5d", "d51633c43b38e2898c0733e44d333da707087810412df3a1b9c583676027a45f14d7561d803644b873aa7a1d6ec5fafacc9cac7c048320927c68c9f4bf588a301b"]'
c655d7aa241dc4a7f2a142cfed20b64bb75a6f9a177ef3d0b534e8885ff90d41e9acae5d00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000041d51633c43b38e2898c0733e44d333da707087810412df3a1b9c583676027a45f14d7561d803644b873aa7a1d6ec5fafacc9cac7c048320927c68c9f4bf588a301b00000000000000000000000000000000000000000000000000000000000000

$ qcli sendtocontract 'a7316edf371e01bbc2939efee987fdd314ac913e' 'c655d7aa241dc4a7f2a142cfed20b64bb75a6f9a177ef3d0b534e8885ff90d41e9acae5d00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000041d51633c43b38e2898c0733e44d333da707087810412df3a1b9c583676027a45f14d7561d803644b873aa7a1d6ec5fafacc9cac7c048320927c68c9f4bf588a301b00000000000000000000000000000000000000000000000000000000000000' 0 250000 0.0000004 'qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW'
{
  "txid": "d341b41a6cf29241b86082df197609a0c5f7a8f9bfa0a4c3bbbdbe7931e22b71",
  "sender": "qUbxboqjBRp96j3La8D1RYkyqx5uQbJPoW",
  "hash160": "7926223070547d2d15b2ef5e7383e541c338ffe9"
}

$ qcli searchlogs 0 -1 '{"addresses":["a7316edf371e01bbc2939efee987fdd314ac913e"]}'
[
  {
    "blockHash": "72a7c0aa7e05cf01de9eaa41e1caaeb3dc3c11ad7fbc5c5c035f0a670608efe8",
    "blockNumber": 603,
    "transactionHash": "d341b41a6cf29241b86082df197609a0c5f7a8f9bfa0a4c3bbbdbe7931e22b71",
    "transactionIndex": 2,
    "from": "7926223070547d2d15b2ef5e7383e541c338ffe9",
    "to": "a7316edf371e01bbc2939efee987fdd314ac913e",
    "cumulativeGasUsed": 34332,
    "gasUsed": 34332,
    "contractAddress": "a7316edf371e01bbc2939efee987fdd314ac913e",
    "excepted": "None",
    "log": [
      {
        "address": "a7316edf371e01bbc2939efee987fdd314ac913e",
        "topics": [
          "fdf33304f48e920659f4c9f42bd0a48dea88781e999be6d592d7f3f03a5a49ae"
        ],
        "data": "0000000000000000000000007926223070547d2d15b2ef5e7383e541c338ffe90000000000000000000000006fd56e72373a34ba39bf4167af82e7a411bfed47"
      }
    ]
  }
]
```

Now, we can see that the recovered address from signature is `6fd56e72373a34ba39bf4167af82e7a411bfed47` not as same as `msg.sender`, `7926223070547d2d15b2ef5e7383e541c338ffe9`


4. clean

```
docker stop myapp
rm -rf .qtum
```
