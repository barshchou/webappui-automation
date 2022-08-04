const comparableTypes = {
    multifamily: "Multifamily",
    mixedUse: "Mixed-Use",
    retail: "Retail",
    office: "Office",
    land: "Land",
    industrial: "Industrial",
    communityFacility: "Community Facility",
    specialPurpose: "Special Purpose"
} as const;

export default Object.freeze(comparableTypes);