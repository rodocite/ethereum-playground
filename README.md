
# Ethereum Playground
This repo explores Ethereum. There are several toy projects within this repo that play with data queried from the blockchain.

# Projects

### Explorer
A block explorer with visualization features that help inspect transactions.
![](https://github.com/rodocite/ethereum-playground/blob/master/explorer.png)

### Hacker Watcher
Uses Web3's `.subscribe()` functionality on the Infura websockets node to listen to pending transactions and match a watched address. I added the listener to Redux although it doesn't need to be.

### Transactions from Address
Showcases query performance/limitations of Web3 versus directly using a JSON-RPC trace query. Needs a synced Parity node with the `--tracing on` flag.
[Screenshot](https://github.com/rodocite/ethereum-playground/blob/master/queries.png)

### Blockchain Art
Uses data from transactions to draw a morphing voronoi chart.
![](https://github.com/rodocite/ethereum-playground/blob/master/art.png)

### Dashboard
A realtime dashboard that queries and updates data from the blockchain. Uses Redux.
[Screenshot](https://github.com/rodocite/ethereum-playground/blob/master/dashboard.png)

## Starting the Project
Start your blockchain node w/ rpc flags. The project uses default ports. The project requires a `.env` file.

```
yarn install
yarn dev
```

### Environment Variables
Create a `.env` file in the root containing these environment variables if you want to see these specific features:
```
GOOGLE_MAPS_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_NUMBER=
```