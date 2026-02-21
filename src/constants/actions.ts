// Unordered; Can't be used for sorting
// Wanted to use enum but ts-node is on strip-only and IDK how to turn it off
export const Action = {
    labOrder: 'labOrder',
    labResult: 'labResult',
    receive: 'receive',
    accept: 'accept',
    approve: 'approve',
    reapprove: 'reapprove',
    unapprove: 'unapprove',
    unreceive: 'unreceive',
    rerun: 'rerun',
    save: 'save',
    listTransactions: 'listTransactions',
    getTransaction: 'getTransaction',
    analyzerResult: 'analyzerResult',
    analyzerRequest: 'analyzerRequest'
} as const;

export type Action = typeof Action[keyof typeof Action];

// Indices used for sorting
export const ACTION_ORDER = [
    Action.labOrder,
    Action.labResult,
    Action.receive,
    Action.accept,
    Action.approve,
    Action.reapprove,
    Action.unapprove,
    Action.unreceive,
    Action.rerun,
    Action.save,
    Action.listTransactions,
    Action.getTransaction,
    Action.analyzerResult,
    Action.analyzerRequest
] as const;