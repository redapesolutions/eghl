
import chai from 'chai'
// import { buildPaymentRequestURL } from '../src/request'
// import isString from 'lodash/isString'
// import isFunction from 'lodash/isFunction'
// import random from 'lodash/random'
// import { MERCHANT_PASSWORD, API_URL, MERCHANT } from './setup'
// import PAYMENT_METHOD from '../src/paymentMethods'
// import CURRENCIES from '../src/currencies'
import { validateAndProcessPaymentResponse } from '../src/response'
import { MERCHANT_PASSWORD } from './setup'

chai.expect();
const expect = chai.expect

describe('Response handling', () => {
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
    ).to.throw(Error)
  })
})
