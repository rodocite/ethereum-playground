import Web3 from 'web3'
import styled from 'styled-components'

const web3 = new Web3('http://localhost:8545')

const Container = styled.div`
  position: relative;
`

const LoadingCell = styled.div`
  background: #999999;
  height: 5px;
  margin: 1px;
  width: 5px;
`

const Cell = styled.div`
  align-items: center;
  animation: 0.3s fadein;
  background: ${props => props.toggled ? '#7ae996' : 'white'};
  border ${props => Math.min(Math.ceil(props.value) / 3, 100) || 1}px solid black;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-weight: 100;
  height ${props => Math.ceil(props.value)* 20}px;
  justify-content: center;
  margin: 5px 1px;
  max-height: 300px;
  max-width: 300px;
  transition: all 0.2s;
  width: ${props => Math.ceil(props.value) * 20}px;

  :after {
    content: ${props => props.value};
  }

  :hover {
    background: #967ae9;
  }

  :active {
    background: darksalmon;
    transform: scale(1.03);
  }

  @keyframes fadein {
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

class Transaction extends React.Component {
  state = {
    data: null,
    details: false
  }

  componentDidMount() {
    web3.eth.getTransaction(this.props.hash)
      .then((transactionData) => {
        this.setState({ data: { ...transactionData }})
      })
  }

  toggleSelection = () => {
    this.setState({
      details: !this.state.details,
    }, () => {
      if (this.state.details) {
        this.props.stage(this.state.data, true)
      } else {
        this.props.stage(this.state.data, false)
      }
    })
  }

  renderCell() {
    const { value: wei } = this.state.data
    const value = Web3.utils.fromWei(wei, 'ether')

    return (
      <Cell
        value={value}
        toggled={this.state.details}
        onClick={this.toggleSelection}
      >{ value >= 1 ? Math.floor(value) : null }</Cell>
    )
  }

  render() {
    return (
      <Container>
        { this.state.data ? this.renderCell() : <LoadingCell /> }
      </Container>
    )
  }
}

export default Transaction