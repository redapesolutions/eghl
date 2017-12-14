
import chai from 'chai'
import { buildPaymentRequestURL } from '../src/request'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import random from 'lodash/random'
import { MERCHANT_PASSWORD, API_URL, MERCHANT } from './setup'
import PAYMENT_METHOD from '../src/paymentMethods'
import CURRENCIES from '../src/currencies'

chai.expect();

const expect = chai.expect

describe('Request URL generation', () => {
  it('should generate a url', () => {
    expect(isString(buildPaymentRequestURL(
      API_URL,
      MERCHANT_PASSWORD,
      {
        Amount: 13.64,
        TransactionType: 'SALE',
        PymtMethod: PAYMENT_METHOD.Any,
        ServiceID: MERCHANT,
        PaymentID: random(9999999, 9999999999999),
        OrderNumber: 12345,
        PaymentDesc: 'Desc',
        MerchantReturnURL: 'https://2ccaf4a8.ngrok.io/',
        CurrencyCode: CURRENCIES.MY,
        CustIP: '115.110.110.21',
        CustName: 'Dawid',
        CustEmail: 'dawidpol1@gmail.com',
        CustPhone: '487321728'
      })))
  })
})
