
import chai from 'chai'
// import { buildPaymentRequestURL } from '../src/request'
// import isString from 'lodash/isString'
// import isFunction from 'lodash/isFunction'
// import random from 'lodash/random'
// import { MERCHANT_PASSWORD, API_URL, MERCHANT } from './setup'
// import PAYMENT_METHOD from '../src/paymentMethods'
// import CURRENCIES from '../src/currencies'
import { validateAndProcessPaymentResponse, validateAndProcessQueryResponse } from '../src/response'
import { MERCHANT_PASSWORD } from './setup'
import { SignatureNotMatching, TransactionPending } from '../src/errors'

chai.expect();
const expect = chai.expect

describe('Response handling', () => {
  describe('PaymentResponse', () => {

    it('should validate the response', () => {
      let response = 'TransactionType=SALE&PymtMethod=DD&ServiceID=sit&PaymentID=29658176626&OrderNumber=12345&Amount=13.64&CurrencyCode=MYR&HashValue=3b98fde0d1507cf27691dc2e20db217f08cfaa056fbf79622e3cb9962722718b&HashValue2=be4cdd4ed1b89189a90863ec8508a539afa839eac3d08b9f11a1a8b9aa2ebcf1&TxnID=sit00000000029658176626&IssuingBank=HostSim&TxnStatus=0&AuthCode=sit000&BankRefNo=sit00000000029658176626&RespTime=2017-12-14+16%3A07%3A02&TxnMessage=Transaction+Successful'

      let result = validateAndProcessPaymentResponse(response, MERCHANT_PASSWORD)

      expect(result).to.eql({
        PymtMethod: 'DD',
        PaymentID: '29658176626',
        OrderNumber: '12345',
        Amount: '13.64',
        CurrencyCode: 'MYR',
        TxnID: 'sit00000000029658176626',
        IssuingBank: 'HostSim',
        TxnStatus: '0',
        TxnMessage: 'Transaction+Successful'
      })
    })
    it('should throw exception wrong hash', () => {
      let response = 'TransactionType=SALE&PymtMethod=DD&ServiceID=sit&PaymentID=29658176626&OrderNumber=12345&Amount=13.64&CurrencyCode=MYR&HashValue=3b98fde0d1507cf27691dc2e20db217f08cfaa056fbf79622e3cb9962722718b&HashValue2=be4cds4ed1b89189a90863ec8508a539afa839eac3d08b9f11a1a8b9aa2ebcf1&TxnID=sit00000000029658176626&IssuingBank=HostSim&TxnStatus=0&AuthCode=sit000&BankRefNo=sit00000000029658176626&RespTime=2017-12-14+16%3A07%3A02&TxnMessage=Transaction+Successful'

      expect(
        () => validateAndProcessPaymentResponse(response, MERCHANT_PASSWORD)
      ).to.throw(SignatureNotMatching)
    })
  })
  describe('QueryResponse', () => {
    it('should throw exception wrong hash', () => {
      let response = 'TxnExists=0&QueryDesc=Record exists in system&TransactionType=QUERY&PymtMethod=DD&ServiceID=sit&PaymentID=29658176626&OrderNumber=12345&Amount=13.64&TotalRefundAmount=0&CurrencyCode=MYR&TxnID=sit00000000029658176626&IssuingBank=HostSim&TxnStatus=0&AuthCode=&BankRefNo=sit00000000029658176626&TxnMessage=Transaction%20Successful&HashValue=d9cf2f5324751ae7636ccd77f133fe9eb48c1a0d445555b94076127de86c25c1&SessionID=r0c3roafl0kn0kkjilo5jupw&HashValue2=3acb8a3dbedc77f0d15c92d402936744a467449a11d9258ea00fc666e0e4ed49&RespTime=2017-12-14%2016%3A07%3A02'

      expect(
        () => validateAndProcessQueryResponse(response, MERCHANT_PASSWORD)
      ).to.throw(SignatureNotMatching)
    })
    it('should throw exception wrong hash', () => {
      let response = 'TxnExists=0&QueryDesc=Record exists in system&TransactionType=QUERY&PymtMethod=DD&ServiceID=sit&PaymentID=29658176626&OrderNumber=12345&Amount=13.64&TotalRefundAmount=0&CurrencyCode=MYR&TxnID=sit00000000029658176626&IssuingBank=HostSim&TxnStatus=2&AuthCode=&BankRefNo=sit00000000029658176626&TxnMessage=Transaction%20Successful&HashValue=d9cf2f5324751ae7636ccd77f133fe9eb48c1c0d445555b94076127de86c25c1&SessionID=r0c3roafl0kn0kkjilo5jupw&HashValue2=7ab530aa2e905b84c53bf005f18e2ed1fdd0b14e77827f3954d4c737069088e8&RespTime=2017-12-14%2016%3A07%3A02'

      expect(
        () => validateAndProcessQueryResponse(response, MERCHANT_PASSWORD)
      ).to.throw(TransactionPending)
    })
  })
})

