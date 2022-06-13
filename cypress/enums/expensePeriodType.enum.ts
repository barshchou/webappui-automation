const expensePeriodType = {
    actual: "Actual",
    projection: "Projection",
    actual_T12: "Actual T12",
    annualizedHistorical: "Annualized Historical"
} as const;

export default Object.freeze(expensePeriodType);