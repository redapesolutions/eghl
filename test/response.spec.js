
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
import { SignatureNotMatching, TransactionPending, TransactionFailed } from '../src/errors'

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
      ).to.throw('Signature not matching') // Because of transpiler problems, attempting to use the Error class would fail
    })
    it('should throw exception TransactionFailed', () => {
      let response = 'TransactionType=SALE&PymtMethod=DD&ServiceID=sit&PaymentID=49f29e98c1cba9d42c37&OrderNumber=42a0a717b9dddfd82cf3&Amount=0.14&CurrencyCode=MYR&HashValue=6494a24c8d2b9f2021f7c680c774af23d1b3b9b415da959422ad50fea5f4277d&HashValue2=04ab06298491b70b093b5583f83aadc805ddfa53e007b414520c81389ee398cc&TxnID=sit49f29e98c1cba9d42c37&IssuingBank=HostSim&TxnStatus=1&AuthCode=&BankRefNo=sit49f29e98c1cba9d42c37&RespTime=2017-12-26+10%3A37%3A53&TxnMessage=Transaction+Failed'

      expect(
        () => validateAndProcessPaymentResponse(response, MERCHANT_PASSWORD)
      ).to.throw('Transaction failed')
    })
    it('should throw exception TransactionPending', () => {
      let response = 'TransactionType=SALE&PymtMethod=DD&ServiceID=sit&PaymentID=49f29e98c1cba9d42c37&OrderNumber=42a0a717b9dddfd82cf3&Amount=0.14&CurrencyCode=MYR&HashValue=6494a24c8d2b9f2021f7c680c774af23d1b3b9b415da959422ad50fea5f4277d&HashValue2=199b35e86da9a678acdaa3cebff3ba2d414fc206250ed27440129c36894a615a&TxnID=sit49f29e98c1cba9d42c37&IssuingBank=HostSim&TxnStatus=2&AuthCode=&BankRefNo=sit49f29e98c1cba9d42c37&RespTime=2017-12-26+10%3A37%3A53&TxnMessage=Transaction+Pending'

      expect(
        () => validateAndProcessPaymentResponse(response, MERCHANT_PASSWORD)
      ).to.throw('Transaction pending')
    })
  })
  describe('QueryResponse', () => {
    it('should throw exception wrong hash', () => {
      let response = 'TxnExists=0&QueryDesc=Record exists in system&TransactionType=QUERY&PymtMethod=DD&ServiceID=sit&PaymentID=29658176626&OrderNumber=12345&Amount=13.64&TotalRefundAmount=0&CurrencyCode=MYR&TxnID=sit00000000029658176626&IssuingBank=HostSim&TxnStatus=0&AuthCode=&BankRefNo=sit00000000029658176626&TxnMessage=Transaction%20Successful&HashValue=d9cf2f5324751ae7636ccd77f133fe9eb48c1a0d445555b94076127de86c25c1&SessionID=r0c3roafl0kn0kkjilo5jupw&HashValue2=3acb8a3dbedc77f0d15c92d402936744a467449a11d9258ea00fc666e0e4ed49&RespTime=2017-12-14%2016%3A07%3A02'

      expect(
        () => validateAndProcessQueryResponse(response, MERCHANT_PASSWORD)
      ).to.throw('Signature not matching')
    })
    it('should throw exception wrong hash', () => {
      let response = 'TxnExists=0&QueryDesc=Record exists in system&TransactionType=QUERY&PymtMethod=DD&ServiceID=sit&PaymentID=29658176626&OrderNumber=12345&Amount=13.64&TotalRefundAmount=0&CurrencyCode=MYR&TxnID=sit00000000029658176626&IssuingBank=HostSim&TxnStatus=2&AuthCode=&BankRefNo=sit00000000029658176626&TxnMessage=Transaction%20Successful&HashValue=d9cf2f5324751ae7636ccd77f133fe9eb48c1c0d445555b94076127de86c25c1&SessionID=r0c3roafl0kn0kkjilo5jupw&HashValue2=7ab530aa2e905b84c53bf005f18e2ed1fdd0b14e77827f3954d4c737069088e8&RespTime=2017-12-14%2016%3A07%3A02'

      expect(
        () => validateAndProcessQueryResponse(response, MERCHANT_PASSWORD)
      ).to.throw('Transaction pending')
    })
  })
})

