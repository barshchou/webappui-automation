const bondTypes = {
    tenYearTreasuryBond: "DGS10",
    thirtyYearTreasuryBond: "DGS30",
    corporateBonds: "DAAA"
} as const;

export default Object.freeze(bondTypes);