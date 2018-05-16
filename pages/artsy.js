import Web3 from 'web3'
import _ from 'lodash'
import styled from 'styled-components'
import { VictoryVoronoi, VictoryTooltip, VictoryTheme } from 'victory';

const web3 = new Web3('http://localhost:8545')

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 100;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    color: #999999;
    font-size: 18px;
    margin: 5px;
    border: none;
    cursor: pointer;

    :focus {
      outline: none;
    }

    :hover {
      color: tomato;
    }
  }
`

class Artsy extends React.Component {
  state = {
    block: null,
    blockData: {},
    transactionHashes: [],
    resolvedTransactions: []
  }

  componentDidMount() {
    this.getBlock()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getBlock(blockNumber = 'latest') {
    web3.eth.getBlock(blockNumber)
      .then(({ transactions, ...blockData }) => {
        this.setState({
          block: blockData.number,
          blockData,
          transactionHashes: transactions
        })
      })
      .then(() => {
        Promise.all(_.map(this.state.transactionHashes, (hash) => this.getTransaction(hash)))
          .then((resolvedTransactions) => this.setState({ resolvedTransactions }))
      })
  }

  async getTransaction(hash) {
    const resolvedTransaction = await web3.eth.getTransaction(hash)
    return Object.assign(resolvedTransaction, {
      x: resolvedTransaction.to,
      y: resolvedTransaction.from
    })
  }

  switchBlock = _.debounce((blockNumber) => {
    this.getBlock(blockNumber)
  }, 100, { leading: true, trailing: false })

  renderVoroni() {
    return this.state.resolvedTransactions ? (
      <VictoryVoronoi
        style={{
          data: {
            stroke: 'tomato',
            strokeWidth: 0.5,
          }
        }}
        data={this.state.resolvedTransactions}
        animate={{
          duration: 2000,
          onLoad: { duration: 500 }
        }}
        labels={(datum) => datum.value}
        labelComponent={<VictoryTooltip />}
      />
    ) : null
  }

  render() {
    const { number, hash } = this.state.blockData
    const { resolvedTransactions } = this.state

    return (
      <Container>
        <Controls>
          <button onClick={() => this.switchBlock(number - 1)}>{"◀"}</button>
          { number }
          <button onClick={() => this.switchBlock(number + 1)}>{"▶"}</button>
        </Controls>
        <div># of Transactions: { this.state.transactionHashes.length }</div>
        { this.renderVoroni() }
      </Container>
    )
  }
}

export default Artsy