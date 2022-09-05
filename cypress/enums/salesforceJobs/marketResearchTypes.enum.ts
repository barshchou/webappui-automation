const marketResearchTypes = {
    withNeighborhood: "2100014529",
    withArea: "2200017342",
    withNeighborhoodAndArea: "2200016060",
    withoutMultipleNeighborhoodAndArea: "1764459005",
    withoutEmptyNeighborhoodAndArea: "2010277287",
    withMarketAndSubmarket: "2200016060"
} as const;

export default Object.freeze(marketResearchTypes);