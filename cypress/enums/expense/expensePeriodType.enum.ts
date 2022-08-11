const expensePeriodType = {
    actual: "Actual",
    projection: "Projection",
    actualT12: "Actual T12",
    annualizedHistorical: "Annualized Historical"
} as const;

export default Object.freeze(expensePeriodType);