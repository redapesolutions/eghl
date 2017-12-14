import axios from 'axios'
import buildUrl from 'build-url'
import {paymentRequest} from './signature'

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
      ...values,
      HashValue: paymentRequest({Password, ...values})
    }
  })

  console.log(requestURL)
}

export const buildSaleRequestURL = (baseURL, Password, values) => {
  return buildPaymentRequestURL(baseURL, Password, {...values, TransactionType: 'SALES'})
}

