const expensePeriodType = {
    ACTUAL: "Actual",
    PROJECTION: "Projection",
    ACTUAL_T12: "Actual T12",
    ANNUALIZED_HISTORICAL: "Annualized Historical"
} as const;

export default Object.freeze(expensePeriodType);