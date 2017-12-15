export function TransactionPending() {
}
TransactionPending.prototype = new Error();

export function TransactionFailed() {
}
TransactionPending.prototype = new Error();

export function SignatureNotMatching() {
}
SignatureNotMatching.prototype = new Error();
