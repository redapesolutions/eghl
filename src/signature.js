import SHA256 from 'crypto-js/SHA256'
import defaults from 'lodash/defaults'
import {pipe} from 'ramda'

export const hashToString = (text) => SHA256(text).toString()

export const optionalValues = (...keys) => (values) => {
  keys.forEach(k => values[k] = values[k] || '')
  return {...values}
}

export const orderedStringFromValues = (...keys) => (values) => {
  return keys.map(k => values[k]).join('')
}

export const requestSignature = pipe(
  optionalValues('CardNo', 'Token', 'MerchantApprovalURL', 'MerchantUnApprovalURL', 'MerchantCallBackURL'),
  orderedStringFromValues('Password', 'ServiceID', 'PaymentID', 'MerchantReturnURL',
    'MerchantApprovalURL', 'MerchantUnApprovalURL', 'MerchantCallBackURL', 'Amount',
    'CurrencyCode', 'CustIP', 'PageTimeout', 'CardNo', 'Token'),
  hashToString
)