require('dotenv').config()

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

module.exports = {
  publicRuntimeConfig: {
    GOOGLE_MAPS_API_KEY
  }
}