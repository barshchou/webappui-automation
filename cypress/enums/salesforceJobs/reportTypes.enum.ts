const reportTypes = {
    withFreddieMac: "2200015959",
    withoutFreddieMac: "1764459005",
    noneFreddieMac: "1764459119",
    multifamily: "2200015959",
    mixedUse: "1907151453",
    retail: "2008055387",
    nonePropertyType: "1764459119"
} as const;

export default Object.freeze(reportTypes);