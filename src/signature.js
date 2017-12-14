import crypto from 'crypto-js'
import defaults from 'lodash/defaults'
import {pipe} from 'ramda'

export const hashToString = (text) => crypto.SHA256(text).toString()

export const optionalValues = (...keys) => (values) => {
  keys.forEach(k => {values[k] = values[k] || ''})
  return {...values}
}

export const orderedStringFromValues = (...keys) => (values) => {
  return keys.map(k => values[k]).join('')
}

const hashFromValues = (...keys) => pipe(
  orderedStringFromValues(...keys),
  hashToString
)

export const paymentRequest = pipe(
  optionalValues('CardNo', 'Token', 'MerchantApprovalURL', 'MerchantUnApprovalURL', 'MerchantCallBackURL'),
  hashFromValues('Password', 'ServiceID', 'PaymentID', 'MerchantReturnURL',
    'MerchantApprovalURL', 'MerchantUnApprovalURL', 'MerchantCallBackURL', 'Amount',
    'CurrencyCode', 'CustIP', 'PageTimeout', 'CardNo', 'Token')
)

export const paymentResponse = hashFromValues(
  'Password', 'TxnID', 'ServiceID','PaymentID','TxnStatus', 
  'Amount', 'CurrencyCode', 'AuthCode', 'OrderNumber', 'Param6', 'Param7'
)

export const queryRequest = hashFromValues(
  'Password','ServiceID' ,'PaymentID' ,'Amount' ,'CurrencyCode'
)

