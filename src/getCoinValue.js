#!/usr/bin/env node
const axios = require('axios')

function getCoinValue(base, convert) {
  var coinInfo = {
    base: base,
    currency: convert,
  }

  return axios.get(`https://api.coinbase.com/v2/prices/${coinInfo.base}-${coinInfo.currency}/spot`)
    .then(response => {
      coinInfo.amount = response.data.data.amount

      return coinInfo
    })
    .then(coinInfo => {
      return axios.get(`https://api.coinbase.com/v2/prices/${coinInfo.base}-${coinInfo.currency}/historic?period=day`)
    })
    .then(response => {
      var data = response.data.data.prices

      var nowPrice = coinInfo.amount
      var wasPrice = data[data.length - 1].price

      coinInfo.since_yesterday_value = (nowPrice - wasPrice).toFixed(2)
      coinInfo.since_yesterday_percent = ((( nowPrice - wasPrice ) / wasPrice ) * 100).toFixed(2)

      return coinInfo
    })
};

module.exports = getCoinValue
