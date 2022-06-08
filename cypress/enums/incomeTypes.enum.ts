const types = {
    RESIDENTIAL: "multifamily",
    COMMERCIAL: "commercial",
    BOTH: "mixed-use"
} as const;

export default Object.freeze(types);