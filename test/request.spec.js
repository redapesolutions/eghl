
import chai from 'chai'
import {buildPaymentRequestURL} from '../src/request'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import {MERCHANT_PASSWORD, API_URL} from './setup'

chai.expect();

const expect = chai.expect

describe('Request URL generation', () => {
  it('should generate a url', () => {
    expect(isString(buildPaymentRequestURL(API_URL, MERCHANT_PASSWORD, {Amount: 13.64})))
  })
})
  