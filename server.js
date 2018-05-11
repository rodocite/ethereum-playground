require('dotenv').config()
const express = require('express')
const next = require('next')
const iplocation = require('iplocation')
const _ = require('lodash')
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var jayson = require('jayson');
var rpc = jayson.client.http('http://localhost:8545')

app.prepare()
  .then(() => {
    const server = express()

    server.get('/message', (req, res) => {
      twilio.messages
        .create({
          body: 'There is suspicious activity in your Ethereum account.',
          from: '+14243638462',
          to: process.env.TWILIO_NUMBER
        })
        .then(message => res.end(message.sid))
        .done()

      res.end('OK')
    })

    server.get('/peers.json', (req, res) => {
      console.log('iplocation API')
      res.setHeader('Content-Type', 'application/json')
      rpc.request('admin_peers', [], (err, response) => {
        const ipAddresses = _.map(response.result, async ({ network }) => iplocation(network.remoteAddress.split(':')[0]))
        Promise.all(ipAddresses).then((addresses) => res.end(JSON.stringify(addresses)))
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })


