export function TransactionPending(responseData) {
  this.message = 'Transaction pending'
  this.responseData = responseData
}
TransactionPending.prototype = Error.prototype;

export function TransactionFailed(responseData) {
  this.message = 'Transaction failed'
  this.responseData = responseData
}
TransactionFailed.prototype = Error.prototype;

export function SignatureNotMatching() {
  this.message = 'Signature not matching'
}
SignatureNotMatching.prototype = Error.prototype;
