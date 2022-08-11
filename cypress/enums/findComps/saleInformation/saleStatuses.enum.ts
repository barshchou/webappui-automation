const saleStatuses= {
    listing: "Listing",
    underContract: "Under Contract",
    transaction: "Transaction"
} as const;

export default Object.freeze(saleStatuses);