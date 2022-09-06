const marketResearchTypes = {
    withNeighborhood: "2100014529",
    withArea: "2200017342",
    withNeighborhoodAndArea: "2200016060",
    withoutMultipleNeighborhoodAndArea: "1764459005",
    withoutEmptyNeighborhoodAndArea: "2010277287",
    withFullMarketAndSubmarket: "2200016060",
    withMultipleSubmarket: "2200019013",
    withEmptyMarketAndSubmarket: "2100013420"
} as const;

export default Object.freeze(marketResearchTypes);