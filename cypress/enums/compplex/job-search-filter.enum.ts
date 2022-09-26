const salePeriod = {
    lastThreeMonths: ".25",
    lastSixMonths:".5",
    lastYear:"1",
    lastYearAndHalf:"1.5",
    lastTwoYears:"2",
    lastThreeYears:"3",
    anyTime:"0"
} as const;

const propertyType = {
    multifamily:"multifamily",
    mixedUse:"mixed-use",
    retail:"retail",
    office:"office",
    land:"land",
    industrial:"industrial",
    communityFacility:"communityfacility"
} as const;

const numberFilters = {
    grossBuildingArea:"grossBuildingArea",
    salePrice:"salePrice",
    pricePerSF:"pricePerSF",
    pricePerUnit: "pricePerUnit",
    commercialUnits:"commercialUnits",
    residentialUnits:"residentialUnits",
    capRate:"capRate"
} as const;

const minMaxInputs = {
    min: "min",
    max: "max"
} as const;

export default {
    salePeriod,
    propertyType,
    numberFilters,
    minMaxInputs
};