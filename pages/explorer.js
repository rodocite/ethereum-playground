import Web3 from 'web3'
import _ from 'lodash'
import styled from 'styled-components'
import Transaction from './components/Transaction'

const web3 = new Web3('http://localhost:8545')

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 100;
  justify-content: center;
`

const TransactionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 40px;
  padding: 10px;
  width: 100%;
`

const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  border: none;
  color: #999999;
  cursor: pointer;
  font-size: 18px;

  :focus {
    outline: none;
  }

  :hover {
    color: tomato;
  }
`

const SearchContainer = styled.div`
  display: flex;
`

const Staging = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  padding-left: 15px;
`

const Orbs = styled.div`
  align-items: center;
  border-right: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 50%;
  height: 100%;
  justify-content: flex-start;
  padding-right: 15px;
  transition: all 0.5s;
`

const Details = styled.div`
  animation-duration: 0.1s;
  animation-name: scaleIn;
  background: white;
  border-radius: 5px;
  border: 2px solid;
  display: flex;
  display: inline-block;
  font-size: 12px;
  margin-bottom: 5px;
  max-width: 400px;
  overflow-wrap: break-word;
  padding: 0px 10px 10px 10px;

  h4 {
    padding-bottom: 10px;
    border-bottom: 1px solid black;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Input = styled.input`
  border: none;
  text-align: center;
  font-size: 14px;
  transition: all 0.3s;
  border-bottom: 1px solid white;

  :hover {
    border-bottom: 1px solid black;
  }

  :focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`

class Explorer extends React.Component {
  state = {
    block: '',
    blockData: {},
    transactions: [],
    stagedTransactions: []
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

  stageTransaction = (transaction, add) => {
    if (add) {
      this.setState({
        stagedTransactions: [...this.state.stagedTransactions, transaction]
      })
    } else {
      const stagedTransactions = _.filter(this.state.stagedTransactions, ({ hash }) => hash !== transaction.hash)

      this.setState({
        stagedTransactions
      })
    }
  }

  renderDetails(transaction) {
    const { hash, to, from, value: wei } = transaction
    const value = Web3.utils.fromWei(wei, 'ether')

    return (
      <Details>
        <h4>{hash}</h4>
        <p>To: {to}</p>
        <p>From: {from}</p>
        <p>ETH: {value}</p>
      </Details>
    )
  }

  switchBlock = (blockNumber) => {
    this.setState({
      transactions: [],
      stagedTransactions: []
    })
    this.getBlock(blockNumber)
  }

  render() {
    const { number, hash } = this.state.blockData

    return (
      <Container>
        <Controls>
          <Button onClick={() => this.switchBlock(number - 1)}>{"◀"}</Button>
          <Input
            value={this.state.block}
            onChange={(e) => this.setState({ block: e.target.value }) }
            onKeyPress={(e) => e.key === 'Enter' ? this.switchBlock(this.state.block) : null}
          />
          <Button onClick={() => this.switchBlock(number + 1)}>{"▶"}</Button>
        </Controls>
        <p># of Transactions: { this.state.transactions.length }</p>
        <TransactionsContainer>
          <Orbs>
            { _.map(this.state.transactions, (hash) => (<Transaction key={hash} hash={hash} stage={this.stageTransaction} />)) }
          </Orbs>
          <Staging>
            { _.map(this.state.stagedTransactions, (transaction) => this.renderDetails(transaction)) }
          </Staging>
        </TransactionsContainer>
      </Container>
    )
  }
}

export default Explorer