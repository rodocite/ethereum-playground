import { initStore, hackerWatcher } from '../store'
import { bindActionCreators } from 'redux'
import withRedux from './utils/withRedux'
import web3 from 'web3'

class HackerWatch extends React.Component {
  state = {
    input: ''
  }

  renderVerySuspicious() {
    return this.props.suspiciousActivity.map((activity) => {
      return (
        <li key={activity.hash}>
          <h4>{ activity.hash }</h4>
          { activity.from } -> { activity.to } for { web3.utils.fromWei(activity.value, 'ether') } ETH
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Hacker Watch</h1>
        <input
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })} />
        <button onClick={() => this.props.hackerWatcher(this.state.input) }>Track Address</button>
        <hr/>
        <ul>
          { this.renderVerySuspicious() }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ suspiciousActivity }) => {
  return {
    suspiciousActivity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hackerWatcher: bindActionCreators(hackerWatcher, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(HackerWatch)