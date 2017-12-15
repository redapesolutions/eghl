import { convertUrlParametersToObject } from './common'
import { paymentResponse } from './signature'
import TransactionStatus from './TransactionStatus'
import { TransactionPending, TransactionFailed, SignatureNotMatching } from './errors'

export const validatePaymentResponse = (body, merchantPassword) => {
  let signature = paymentResponse({
    Password: merchantPassword,
    ...body
  })

  console.log(signature)
  if (signature !== body.HashValue2) {
    return false;
  }

  return true;
}

export const getResponseValues = (body) => {
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

export const validateAndProcessPaymentResponse = (body, merchantPassword) => {
  body = convertUrlParametersToObject(body)

  if (!validatePaymentResponse(body, merchantPassword)) {
    throw new SignatureNotMatching()
  }

  switch (body.TxnStatus) {
    case TransactionStatus.SUCCESSFUL:
      return getResponseValues(body)
    case TransactionStatus.FAILED:
      throw new TransactionFailed()
    case TransactionStatus.PENDING:
      throw new TransactionPending()
    default:
      throw new Error('Unknown payment status')
  }

}

export const validateAndProcessQueryResponse = (body, merchantPassword) => {
  return validateAndProcessPaymentResponse(body, merchantPassword)
}

