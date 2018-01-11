# eghl Payment Gateway

eGHL payment gateway library

![CircleCI](https://circleci.com/gh/redapesolutions/eghl.svg?style=shield&circle-token=:circle-token)

## Features

* Generate url for payment page from details including hash
* Verify a payment response
* TODO POST calls to query status of payments

## Getting started

1. `npm install eghl`
1. `import {buildSalesRequestURL} from 'eghl'`

## Changelog

### v0.8.7

* use native encode URI component for more accurate encoding
* fix Error focused tests
* cleanup

## Authors

* [Dawid](https://github.com/Dawidpol)
* [Mat](https://github.com/matiboy)
