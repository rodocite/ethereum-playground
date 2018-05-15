import Web3 from 'web3'
import _ from 'lodash'
import styled from 'styled-components'
import Transaction from './components/Transaction'

const web3 = new Web3('http://localhost:8545')

const Container = styled.div`
  font-weight: 100;
`

const TransactionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

class Explorer extends React.Component {
  state = {
    block: null,
    blockData: {},
    transactions: []
  }

  componentDidMount() {
    this.getBlock()
  }

  getBlock(blockNumber = 'latest') {
    web3.eth.getBlock(blockNumber)
      .then(({ transactions, ...blockData }) => {
        this.setState({
          block: blockData.number,
          blockData,
          transactions
        })
      })
  }

  switchBlock = _.debounce((blockNumber) => {
    this.getBlock(blockNumber)
  }, 100, { leading: true, trailing: false })

  render() {
    const { number, hash } = this.state.blockData

    return (
      <Container>
        <button onClick={() => this.switchBlock(number - 1)}>{"<"}</button>
        <button onClick={() => this.switchBlock(number + 1)}>{">"}</button>
        <div>{ number }</div>
        <div>{ hash }</div>
        <div># of Transactions: { this.state.transactions.length }</div>
        <TransactionsContainer>
          { _.map(this.state.transactions, (hash) => (<Transaction key={hash} hash={hash} />)) }
        </TransactionsContainer>
      </Container>
    )
  }
}

export default Explorer