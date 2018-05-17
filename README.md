
# Ethereum Playground
This repo explores Ethereum. There are several toy projects within this repo that play with data queried from the blockchain.

[[VIDEO](Watch a quick demo)](https://youtu.be/4IMw5-YihZ4)

# Projects

### Explorer
A block explorer with visualization features that help inspect transactions. The larger the orb, the larger the transaction. You can stage transactions on the right side of the page for closer inspection by clicking on the orb.
![](https://github.com/rodocite/ethereum-playground/blob/master/explorer.png)

### Transactions from Address
Showcases query performance/limitations of Web3 versus directly using a JSON-RPC trace query. Needs a synced Parity node with the `--tracing on` flag.

![](https://github.com/rodocite/ethereum-playground/blob/master/queries.png)

### Blockchain Art
Uses data from transactions to draw a morphing voronoi chart.
![](https://github.com/rodocite/ethereum-playground/blob/master/art.gif)

### Hacker Watcher
Uses Web3's `.subscribe()` functionality to listen to pending transactions and match a watched address. Uses Twilio to warn the user of "suspicious activity" on their account. This is a minimal implementation and in a production app, you'd probably listen to pending transactions, recent transactions, and do a back-search on posted transactions to ensure that the service did not miss any activity.

I've set it to an Infura websockets endpoint, but I've found that the Infura websockets node often misses transactions. For best results, use this feature with Geth. Any activity will render onto the page. If you've enabled Twilio, you will also receive a text.

### Dashboard
A realtime dashboard that queries and updates data from the blockchain. Uses Redux.
![](https://github.com/rodocite/ethereum-playground/blob/master/dashboard.png)

## Starting the Project
Start your ethereum node w/ rpc flags. The project uses default ports. The project requires a `.env` file.

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