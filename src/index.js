#!/usr/bin/env node
const program = require('commander')
const axios = require('axios')
const ora = require('ora')
const Table = require('cli-table2')
const colors = require('colors')
const getCoinValue = require('./getCoinValue')

program
  .version('0.0.1')
  .option('-c, --convert [currency]', 'Convert to your fiat currency', 'usd')
  .parse(process.argv)

const convert = program.convert.toUpperCase()
const availableCurrencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MTL', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SVC', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'YER', 'ZAR', 'ZMK', 'ZMW', 'ZWL']
if (availableCurrencies.indexOf(convert) === -1) {
  return console.log('We cannot convert to your fiat currency.'.red)
}

const table = new Table({
  chars: {
    'top': '-',
    'top-mid': '-',
    'top-left': '-',
    'top-right': '-',
    'bottom': '-',
    'bottom-mid': '-',
    'bottom-left': '-',
    'bottom-right': '-',
    'left': '║',
    'left-mid': '-' ,
    'mid': '-' ,
    'mid-mid': '-',
    'right': '║',
    'right-mid': '-',
    'middle': '│'
  },
  head: ['#', 'Coin', `Price (${convert})`, `Since yesterday (${convert})`, `Since yesterday (%)` ].map(title => title.yellow),
  colWidths: [3, 9, 20, 26, 26]
});

const spinner = ora('Loading data').start()

axios.all([getCoinValue('BTC', convert),
           getCoinValue('BCH', convert), 
           getCoinValue('ETH', convert),
           getCoinValue('LTC', convert)])
.then(response => {
  spinner.stop()

  response
    .map((record, index) => {
      const valueChange24h = record.since_yesterday_value
      const changeValue24h = valueChange24h ? (valueChange24h > 0 ? valueChange24h.green : valueChange24h.red) : 'NA'

      const percentChange24h = record.since_yesterday_percent
      const textChange24h = `${percentChange24h}%`
      const changePercent24h = percentChange24h? (percentChange24h > 0 ? textChange24h.green : textChange24h.red) : 'NA'

      return [
        index + 1,
        `💰  ${record.base}`,
        record.amount,
        changeValue24h,
        changePercent24h
      ]
    })
    .forEach(record => table.push(record))
  if (table.length === 0) {
    console.log('We are not able to find coins matching your keywords'.red);
  } else {
    console.log(`Data source from coinbase.com at ${new Date().toLocaleTimeString()}`)
    console.log(table.toString());
  }
})
.catch(function (error) {
  spinner.stop();
  console.error('Coinbase is not working now. Please try again later.'.red);
});
