const salePeriodValues= {
    lastThreeMonths: "Last 3 Months",
    lastSixMonths: "Last 6 Months",
    lastYear: "Last Year",
    lastTwoYears: "Last 2 Years",
    lastThreeYears: "Last 3 Years",
    anyTime: "Any Time"
} as const;

/*
 * const salePeriodValues= {
 *     lastThreeMonths: ".25",
 *     lastSixMonths: ".5",
 *     lastYear: "1",
 *     lastOneAndHalfYears: "1.5",
 *     lastTwoYears: "2",
 *     lastThreeYears: "3",
 *     anyTime: "0"
 * } as const;
 */


export default Object.freeze(salePeriodValues);