import Web3 from 'web3'
import styled from 'styled-components'

const web3 = new Web3('http://localhost:8545')

const Container = styled.div`
  position: relative;
`

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.toggled ? 'darksalmon' : 'white'};
  border ${props => Math.min(Math.ceil(props.value) / 3, 100) || 1}px solid black;
  margin: 5px;
  width: ${props => Math.ceil(props.value) * 20}px;
  height ${props => Math.ceil(props.value)* 20}px;
  max-width: 300px;
  max-height: 300px;
  transition: all 0.3s;
  border-radius: 50%;
  animation: 0.3s fadein;
  font-weight: 100;

  :after {
    content: ${props => props.value};
  }

  :hover {
    background: darksalmon;
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

const Details = styled.div`
  position: absolute;
  font-size: 12px;
  padding: 0px 10px 10px 10px;
  background: white;
  display: inline-block;
  border: 2px solid;
  z-index: 2;
  border-radius: 5px;
  animation-duration: 0.2s;
  animation-name: scaleIn;

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

class Transaction extends React.Component {
  state = {
    data: null,
    details: false,
    toggleDetails: false
  }

  componentDidMount() {
    web3.eth.getTransaction(this.props.hash)
      .then((transactionData) => {
        this.setState({ data: { ...transactionData }})
      })
  }

  renderDetails() {
    const { hash, to, from, value: wei } = this.state.data
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

  render() {
    if (!this.state.data) return null
    const { value: wei } = this.state.data
    const value = Web3.utils.fromWei(wei, 'ether')

    return (
      <Container>
        <Cell
          value={value}
          toggled={this.state.toggleDetails}
          onClick={() => this.setState({ toggleDetails: !this.state.toggleDetails })}
        >{ value >= 1 ? Math.floor(value) : null }</Cell>
        { this.state.toggleDetails && this.renderDetails() }
      </Container>
    )
  }
}

export default Transaction