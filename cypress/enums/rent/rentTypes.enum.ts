const rentTypes = {
    marketRate: "Market Rate",
    rentStabilized: "Rent Stabilized",
    rentControlled: "Rent Controlled",
    section8: "Section 8"
} as const;

export default Object.freeze(rentTypes);