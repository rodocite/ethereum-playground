const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')

const scanTransactionCallback = (account, txn, callback) => {
  web3.eth.getTransaction(txn)
    .then(({to, from, ...txn}) => {
      if (to === account) {
        callback({to, from, ...txn})
      }

      if (from === account) {
        callback({to, from, ...txn})
      }
    })
}

const scanBlockCallback = (account, block, cb) => {
  if (block.transactions.length) {
    block.transactions.forEach((txn) => {
      scanTransactionCallback(account, txn, cb);
    })
  }
}

const scanBlockRange = (account, startingBlock, stoppingBlock, callback, confirmationCallback) => {
  if (startingBlock > stoppingBlock) {
    throw 'Stopping block must be higher than starting block.'
  }

  let stoppingBlock_
  if (!stoppingBlock) {
    stoppingBlock_ = startingBlock + 1000
  }

  let blockNumber = startingBlock
  let startTime = new Date()

  function asyncScanNextBlock() {
    if (blockNumber > stoppingBlock_) {
      confirmationCallback()
      return
    }

    let myBlockNumber = blockNumber++

    web3.eth.getBlock(myBlockNumber)
      .then((block) => {
        scanBlockCallback(account, block, callback)
        asyncScanNextBlock()
      })
      .catch((err) => console.log(err))
  }

  for (let newThread = 0; newThread < 4 && startingBlock + newThread <= stoppingBlock_; newThread++) {
    asyncScanNextBlock()
  }
}

class Web3Query extends React.Component {
  state = {
    address: '',
    transactions: [],
    done: 'initialized',
    duration: 0
  }

  async getAccountTransactions(account) {
    // scanBlockRange("0x49B4aE25241F35DB8Ff534aDeb31855731eDF975", 2423000, undefined, console.log)
    // 1000 blocks from 2423000
    this.setState({ done: 'loading' })

    const t0 = performance.now()

    const latestBlock = await web3.eth.getBlock('latest')
    scanBlockRange(account, 2423000, undefined, (transaction) => {
      this.setState({
        transactions: [...this.state.transactions, transaction]
      })
    }, () => {
      this.setState({
        done: 'done',
        duration: performance.now() - t0
      })
    })
  }

  renderTransactions() {
    return (
      <div>
        <h1>Address - { this.state.address }</h1>
        <ul>
          { this.state.transactions.map((txn) => <li key={txn.hash}>{txn.hash}</li>) }
        </ul>
        <h5>Query took {Math.floor(this.state.duration / 1000)} seconds.</h5>
      </div>
    )
  }

  render() {
    return (
      <div>
        <input value={ this.state.address } onChange={(e) => this.setState({ address: e.target.value })} />
        <button onClick={() => this.getAccountTransactions(this.state.address)}>Find Address</button>
        <div>
          { this.state.done === 'loading' && <div>Loading Transactions...</div>}
          { this.state.done === 'done' && this.renderTransactions() }
        </div>
      </div>
    )
  }
}

export default Web3Query
