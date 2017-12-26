export function TransactionPending() {
  console.log('Blah TransactionPending')
}
TransactionPending.prototype = new Error('Transaction pending');

export function TransactionFailed() {
  console.log('Blah TransactionFailed')
}
TransactionFailed.prototype = new Error('Transaction failed');

export function SignatureNotMatching() {
  console.log('Blah SignatureNotMatching')
}
SignatureNotMatching.prototype = new Error('Signature not matching');
