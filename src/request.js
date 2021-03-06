import buildUrl from 'build-url'
import { encodeValues } from './common'
import { paymentRequest, queryRequest } from './signature'

/*
{
  TransactionType,
  PymtMethod,
  ServiceID,
  PaymentID,
  OrderNumber,
  PaymentDesc,
  MerchantReturnURL,
  Amount,
  CurrencyCode,
  CustIP,
  CustName,
  CustEmail,
  CustPhone,
  B4TaxAmt,
  TaxAmt,
  MerchantName,
  CustMAC,
  MerchantApprovalURL,
  MerchantUnApprovalURL,
  MerchantCallBackURL,
  LanguageCode,
  PageTimeout,
  CardHolder,
  CardNo,
  Param6,
  Param7
}*/

export const buildPaymentRequestURL = (baseURL, Password, values) => {
  const requestURL = buildUrl(`https://${baseURL}`, {
    queryParams: {
      ...encodeValues(values),
      HashValue: paymentRequest({ Password, ...values })
    }
  })

  return requestURL;
}

export const buildSaleRequestURL = (baseURL, Password, values) => {
  return buildPaymentRequestURL(baseURL, Password, { ...values, TransactionType: 'SALES' })
}

export const buildQueryRequestUrl = (baseURL, Password, values) => {
  values = {
    ...values,
    TransactionType: 'QUERY'
  }

  return buildUrl(`https://${baseURL}`, {
    queryParams: {
      ...encodeValues(values),
      HashValue: queryRequest({ Password, ...values })
    }
  })
}
