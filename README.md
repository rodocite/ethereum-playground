
# Ethereum Playground
I set this project up to explore Ethereum. There are several toy projects within this repo that play with data queried from the blockchain.

# Projects
### Dashboard
A realtime dashboard that queries and updates data from the blockchain. Uses Redux.
![](https://github.com/rodocite/ethereum-playground/blob/master/dashboard.png)

### Hacker Watcher
Uses Web3's `.subscribe()` functionality on the Infura websockets node to listen to pending transactions and match a watched address. I added the listener to Redux although it doesn't need to be.

### Transactions from Address
Two projects showcasing query performance/limitations of Web3 versus directly using a JSON-RPC trace query. Needs a synced Parity node with the `--tracing on` flag.
![](https://github.com/rodocite/ethereum-playground/blob/master/queries.png)

### Blockchain Art
Uses data from transactions to draw a morphing voronoi chart.
![](https://github.com/rodocite/ethereum-playground/blob/master/art.png)

### Explorer
A block explorer with visualization features that help inspect transactions.
![](https://github.com/rodocite/ethereum-playground/blob/master/explorer.png)

## Starting the Project
Start your blockchain node w/ rpc flags.

```
yarn install
yarn dev
```