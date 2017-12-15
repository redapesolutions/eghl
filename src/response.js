import { convertUrlParametersToObject } from './common'
import { paymentResponse } from './signature'

export const validateAndProcessPaymentResponse = (body, merchantPassword) => {
  body = convertUrlParametersToObject(body)
  let signature = paymentResponse({
    Password: merchantPassword,
    ...body
  })

  if (signature !== body.HashValue2) {
    throw new Error('Signature is not correct')
  }

  return {
    PymtMethod: body.PymtMethod,
    PaymentID: body.PaymentID,
    OrderNumber: body.OrderNumber,
    Amount: body.Amount,
    TxnID: body.TxnID,
    CurrencyCode: body.CurrencyCode,
    TxnStatus: body.TxnStatus,
    IssuingBank: body.IssuingBank,
    TxnMessage: body.TxnMessage
  };
}
