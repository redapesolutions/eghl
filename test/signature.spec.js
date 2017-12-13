/* global describe, it, before */

import chai from 'chai'
import {paymentRequest, paymentResponse,
  hashToString, optionalValues, orderedStringFromValues} from '../src/signature'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'

chai.expect();

const expect = chai.expect

describe('Signature generation', () => {
  describe('utilities', () => {
    describe('hashToString', () => {
      it('should return a string', () => {
        expect(
          isString(hashToString('dsadsa'))
        ).to.be.true
      })
      it('should hash correctly', () => {
        expect(
          hashToString('somerandomestuff')
        ).to.equal('5fa3569cad6ac8dabca645a885fb44b3ff7b670c149ab03559985c52e03387a5')
      })
    })
    describe('optional values', () => {
      it('should return a function', () => {
        expect(
          isFunction(optionalValues('anything'))
        ).to.be.true
      })
      it('should fill optional values with empty strings', () => {
        const keys = ['a', 'b']
        const obj = optionalValues(...keys)({})
        keys.forEach(k => expect(obj).to.have.property(k).which.is.equal(''))
      })
      it('should not touch existing values', () => {
        const keys = ['a', 'b']
        const original = {'a': 42, 'c': 50}
        const obj = optionalValues(...keys)(original)
        expect(obj.a).to.equal(original.a)
        expect(obj.c).to.equal(original.c)
        expect(obj.b).to.equal('')
      })
    })
    describe('orderedStringFromValues', () => {
      it('should return a function', () => {
        expect(
          isFunction(orderedStringFromValues('a', 'b'))
        ).to.be.true
      })
      it('should put all strings together in the correct order', () => {
        const original = {
          'a': 42,
          'g': 'a',
          'o': 't'
        }
        expect(orderedStringFromValues('a', 'o', 'g')(original)).to.equal('42ta')
      })
    })
  })
  describe('for request', () => {
    /*
    Payment request’s Hash Value should be generated based on the following fields:
    Hash Key = Password + ServiceID + PaymentID + MerchantReturnURL +
    MerchantApprovalURL + MerchantUnApprovalURL + MerchantCallBackURL + Amount
    + CurrencyCode + CustIP + PageTimeout + CardNo + Token
    NOTE:
    a) If Token value is provided in Token field, Token value to be put in the above Hash Key
    string needs to be in clear format and not in encoded format. For example, if Token
    value is “2r8j/OsME hxI99PZcHwVg==”, then Token value to be put in Hash Key is
    “2r8j/OsME hxI99PZcHwVg==” instead of “2r8j%2FOsME%20hxI99PZcHwVg%3D%3D”.
    b) If CardNo / Token / MerchantApprovalURL / MerchantUnApprovalURL /
    MerchantCallBackURL are not provided in Payment request, then these fields in the
    above Hash Key should be just left empty.
    Hash Key Example
    abc123S22PAYTEST123https://www.shop.com/success.asp12.34MYR113.210.6.1509004444333322221111
    Hash Value (SHA256)
    28010d7207bdbd6e8ae3890fdb56c541c552c10b609b978fd69428fbb
    7a4fbc2
    */
    describe('without any non-mandatory item', () => {
      it('should return correct hash', () => {
        expect(paymentRequest({
          Password: 'abc123',
          CurrencyCode: 'MYR', 
          ServiceID: 'S22',
          PaymentID: 'PAYTEST123',
          MerchantReturnURL: 'https://www.shop.com/success.asp',
          Amount: 12.34,
          CustIP: '113.210.6.150', 
          PageTimeout: 900,
          CardNo: '4444333322221111'
        })).to.equal('28010d7207bdbd6e8ae3890fdb56c541c552c10b609b978fd69428fbb7a4fbc2')
      })
    })
  })
  describe('payment response', () => {
    it('should return correct hash', () => {
      expect(paymentResponse({
        Password: 'abc123',
        TxnID: 'TESTTXN123',
        ServiceID: 'S22',
        Param7: '77',
        PaymentID: 'PAYTEST123',
        TxnStatus: '1',
        Amount: '12.34',
        CurrencyCode: 'MYR',
        AuthCode: '123456',
        OrderNumber: '0007901000',
        Param6: '66',
      })).to.equal('8795c391a3091585295906a0694d9d13d29c38aa3d4d4521385f222ac19fb773')
    })
  })
  describe('query/reversal/capture/refund request', () => {
    it('should return correct hash', () => {
      expect(paymentResponse({
        Password: 'abc123',
        PaymentID: 'PAYTEST123',
        ServiceID: 'S22',
        Amount: '12.34',
        CurrencyCode: 'MYR',
      })).to.equal('320b0e212a875228fb80efd7604534af47055e56167aa7e83842cf68788097b5')
    })
  })
});


