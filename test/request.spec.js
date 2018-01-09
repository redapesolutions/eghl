
import chai from 'chai'
import { buildPaymentRequestURL, buildQueryRequestUrl } from '../src/request'
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
    let url = buildPaymentRequestURL(
      API_URL,
      MERCHANT_PASSWORD,
      {
        Amount: 13.64,
        TransactionType: 'SALE',
        PymtMethod: PAYMENT_METHOD.Any,
        ServiceID: MERCHANT,
        PaymentID: random(9999999, 9999999999999),
        OrderNumber: 12345,
        PaymentDesc: 'Desc Desc',
        MerchantReturnURL: 'https://2ccaf4a8.ngrok.io/',
        CurrencyCode: CURRENCIES.MY,
        CustIP: '115.110.110.21',
        CustName: 'Dawid',
        CustEmail: 'dawidpol1@gmail.com',
        CustPhone: '487321728'
      })

    expect(isString(url) && url != null).to.be.true
  })
  it('should encode values', () => {
    let url = buildPaymentRequestURL(
      API_URL,
      MERCHANT_PASSWORD,
      {
        Amount: 13.64,
        TransactionType: 'SALE',
        PymtMethod: PAYMENT_METHOD.Any,
        ServiceID: MERCHANT,
        PaymentID: random(9999999, 9999999999999),
        OrderNumber: 12345,
        PaymentDesc: 'Desc Desc',
        MerchantReturnURL: 'https://2ccaf4a8.ngrok.io/',
        CurrencyCode: CURRENCIES.MY,
        CustIP: '115.110.110.21',
        CustName: 'Dawid',
        CustEmail: 'dawidpol1@gmail.com',
        CustPhone: '487321728'
      })

    expect(isString(url) && url != null).to.be.true
    expect(url.includes('PaymentDesc=Desc%20Desc')).to.be.true
    expect(url.includes('dawidpol1%40gmail.com')).to.be.true
  })
  it('should generate a query url', () => {
    const url = buildQueryRequestUrl(
      API_URL,
      MERCHANT_PASSWORD,
      {
        Amount: 13.64,
        PymtMethod: PAYMENT_METHOD.DirectDebit,
        ServiceID: MERCHANT,
        PaymentID: 29658176626,
        CurrencyCode: CURRENCIES.MY
      })

    expect(isString(url) && url != null).to.be.true
  })
})
