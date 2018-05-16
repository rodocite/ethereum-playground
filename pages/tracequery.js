const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')

class TraceQuery extends React.Component {
  state = {
    address: '',
    transactions: [],
    done: 'initialized',
    duration: 0
  }

  getAccountTransactions() {
    // scanBlockRange("0x49B4aE25241F35DB8Ff534aDeb31855731eDF975", 2423000, undefined, console.log)
    // 1000 blocks from 2423000
    this.setState({ done: 'loading' })

    const t0 = performance.now()

    fetch(`/address?address=${this.state.address}`)
      .then((data) => {
        return data.json()
      })
      .then(({ data }) => {
        this.setState({
          transactions: data
        }, () => {
          this.setState({
            done: 'done',
            duration: performance.now() - t0
          })
        })
      })
  }

  renderTransactions() {
    if (!this.state.transactions.length) return
    const { transactions } = this.state

    return (
      <div>
        <h1>Address - { this.state.address }</h1>
        <ul>
          { transactions.map(({ transactionHash }) => <li key={transactionHash}>{transactionHash}</li>) }
        </ul>
        <h5>Query took {Math.floor(this.state.duration / 1000)} seconds.</h5>
      </div>
    )
  }

  render() {
    return (
      <div>
        <input value={ this.state.address } onChange={(e) => this.setState({ address: e.target.value })} />
        <button onClick={() => this.getAccountTransactions()}>Find Address</button>
        <div>
          { this.state.done === 'loading' && <div>Loading Transactions...</div>}
          { this.state.done === 'done' && this.renderTransactions() }
        </div>
      </div>
    )
  }
}

export default TraceQuery
