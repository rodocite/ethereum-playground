import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, startUpdates, hackerWatcher } from '../store'
import withRedux from './utils/withRedux'
import Map from './components/Map'
import AreaGraph from './components/AreaGraph'
import Block from './components/Block'

class Dashboard extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.peers.length !== this.props.peers.length) {
      return true
    }

    if (nextProps.latestBlock !== this.props.latestBlock) {
      return true
    }

    return false
  }

  componentDidMount () {
    this.interval = this.props.startUpdates()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  renderCurrentGasPrice() {
    return (
      <div>
        <h1>Median Gas Price</h1>
        <h3>{ this.props.currentGasPrice } ETH</h3>
      </div>
    )
  }

  render () {
    const { peers, latestBlock } = this.props
    const { hash, number } = latestBlock

    return (
      <div>
        <Block title="Latest Block" block={this.props.latestBlock} showDifficulty />
        { this.renderCurrentGasPrice() }
        <AreaGraph title="Transactions Activity" data={this.props.activity} />
        <Map peers={this.props.peers} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startUpdates: bindActionCreators(startUpdates, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Dashboard)