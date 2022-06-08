const unitsOfMeasure = {
    ANNUALLY: "annually",
    MONTHLY: "monthly",
    PER_SQUARE_FOOT_PER_YEAR: "per square foot per year",
    PER_SQUARE_FOOT_PER_MONTH: "per square foot per month"
} as const;

export default Object.freeze(unitsOfMeasure);