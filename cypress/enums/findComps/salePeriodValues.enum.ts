const salePeriodValues= {
    lastThreeMonths: ".25",
    lastSixMonths: ".5",
    lastYear: "1",
    lastOneAndHalfYears: "1.5",
    lastTwoYears: "2",
    lastThreeYears: "3",
    anyTime: "0"
} as const;

export default Object.freeze(salePeriodValues);