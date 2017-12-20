# Coinbase Value
![Relase](https://img.shields.io/badge/relase-0.0.2-7ec699.svg)
[![node](https://img.shields.io/badge/NodeJs-%3E%3D6.0.0-brightgreen.svg)](http://nodejs.org/download/)

> 💰 Coinbase value CLI.

Coinbase price monitoring tool.  
All data comes from [coinbase.com](https://coinbase.com/) APIs.  
Based on [Coinmon](https://github.com/bichenkk/coinmon)

## Install

Make sure that you have [Node](https://nodejs.org/) version 6.0.0 or higher.

```
$ npm install -g coinbase-value
```

## Usage

To check Bitcoin, Bitcoin cash, Ethereum and Lightcoin
```
$ coinbase
```

## Options

You can use the `-c` (or `--convert`) with the fiat currency symbol to find in terms of another currency.
The default currency is USD and it supports:

```
AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN,
BHD, BIF, BMD, BND, BOB, BRL, BSD, BTC, BTN, BWP, BYN, BYR, BZD, CAD,
CDF, CHF, CLF, CLP, CNY, COP, CRC, CUC, CVE, CZK, DJF, DKK, DOP, DZD,
EEK, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GGP, GHS, GIP, GMD, GNF,
GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, IMP, INR, IQD, ISK, JEP,
JMD, JOD, JPY, KES, KGS, KHR, KMF, KRW, KWD, KYD, KZT, LAK, LBP, LKR,
LRD, LSL, LTL, LVL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRO, MTL,
MUR, MVR, MWK, MXN, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB,
PEN, PGK, PHP, PKR, PLN, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR,
SEK, SGD, SHP, SLL, SOS, SRD, SSP, STD, SVC, SZL, THB, TJS, TMT, TND,
TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, UYU, UZS, VEF, VND, VUV, WST,
XAF, XAG, XAU, XCD, XDR, XOF, XPD, XPF, XPT, YER, ZAR, ZMK, ZMW, ZWL
```


```
$ coinbase -c eur // convert prices to Euro
$ coinbase -c cad // convert prices to the Canadian dolar
```

## Screenshot
![Coinbase](https://raw.githubusercontent.com/srdjanprpa/coinbase-value/master/screenshot.png)

## Development

It's simple to run `coinbase` on your local computer.  
The following is step-by-step instruction.

```
$ git clone https://github.com/srdjanprpa/coinbase-value.git
$ cd coinbase
$ npm install -g
$ npm link
$ coinbase
```

### Badges

[![sp](https://img.shields.io/badge/Power%20by-SP-f8c555.svg)](https://srdjanprpa.com/)
[![license](https://img.shields.io/badge/licence-MIT-67cdcc.svg)](https://github.com/srdjanprpa/coinbase/blob/master/LICENSE.md)
