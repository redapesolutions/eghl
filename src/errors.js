export function TransactionPending() {
}
TransactionPending.prototype = new Error('Transaction pending');

export function TransactionFailed() {
}
TransactionPending.prototype = new Error('Transaction failed');

export function SignatureNotMatching() {
}
SignatureNotMatching.prototype = new Error('Signature not matching');
