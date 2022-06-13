const types = {
    residential: "multifamily",
    commercial: "commercial",
    both: "mixed-use"
} as const;

export default Object.freeze(types);