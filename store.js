import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import Web3 from 'web3'
const web3 = new Web3('http://localhost:8545')
const web3websockets = new Web3('wss://mainnet.infura.io/ws')

const initialState = {
  latestBlock: '',
  peers: [],
  activity: [],
  suspiciousActivity: [],
  currentGasPrice: 0
}

export const actionTypes = {
  LATEST_BLOCK: 'LATEST_BLOCK',
  PEERS: 'PEERS',
  CURRENT_GAS_PRICE: 'CURRENT_GAS_PRICE',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY'
}

export const hackerWatcher = (watchedAddress) => (dispatch) => {
  web3websockets.eth.subscribe('pendingTransactions')
    .on('data', (pending) => {
      web3.eth.getTransaction(pending)
        .then((suspicious) => {
          if (suspicious) {
            if (suspicious.to === watchedAddress || suspicious.from === watchedAddress) {
              // Disable Twilio for now
              // fetch('/message')
              dispatch(setSuspiciousActivity(suspicious))
            }
          }
        })
    })
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LATEST_BLOCK:
      const numberOfTransactions = action.latestBlock.transactions.length
      let activity_ = [...state.activity]

        if (activity_.length > 99) {
          activity_.shift()
        }

        if (numberOfTransactions !== activity_.length) {
          activity_.push({ name: 'activity', amount: numberOfTransactions })
        }

      return { ...state, latestBlock: action.latestBlock, activity: activity_ }
    case actionTypes.PEERS:
      return { ...state, peers: action.peers }
    case actionTypes.SUSPICIOUS_ACTIVITY:
        return { ...state, suspiciousActivity: [...state.suspiciousActivity, action.suspiciousActivity] }
    case actionTypes.CURRENT_GAS_PRICE:
      return { ...state, currentGasPrice: action.currentGasPrice }
    default:
      return state
  }
}

export const startUpdates = () => (dispatch) => {
  // Leave this here for now so it doesn't hammer the iplocation API
  dispatch(getPeers())

  setInterval(() => {
    dispatch(getLatestBlock())
    dispatch(getGasPrice())
  }, 1500)
}

const getLatestBlock = async () => {
  const latestBlock = await web3.eth.getBlock('latest')
  return { type: actionTypes.LATEST_BLOCK, latestBlock }
}

const resolvePeers = async () => {
  const peers = await fetch('/peers.json')
  return peers.json()
}

const getPeers = async () => {
  const peers = await resolvePeers()
  return { type: actionTypes.PEERS, peers }
}

const setSuspiciousActivity = (suspiciousActivity) => {
  return { type: actionTypes.SUSPICIOUS_ACTIVITY, suspiciousActivity }
}

const getGasPrice = async () => {
  const wei = await web3.eth.getGasPrice()
  return { type: actionTypes.CURRENT_GAS_PRICE, currentGasPrice: web3.utils.fromWei(wei, 'ether') }
}

export const initStore = (initialState = initialState) => {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(promiseMiddleware, thunkMiddleware)
  )
}