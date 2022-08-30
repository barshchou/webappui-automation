const feasiblePropertyTypes = {
    multiFamily: "multiFamily",
    residentialCondo: "residentialCondo",
    industrialCondo: "industrialCondo",
    officeCondo: "officeCondo",
    mixedUseCommercialApartment: "mixedUseCommercialApartment",
    retailSpace: "retailSpace",
    officeSpace: "officeSpace",
    industrialSpace: "industrialSpace"
} as const;

export default Object.freeze(feasiblePropertyTypes);