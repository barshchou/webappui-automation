const feasiblePropertyTypes = {
    MultiFamily: "multiFamily",
    ResidentialCondo: "residentialCondo",
    IndustrialCondo: "industrialCondo",
    OfficeCondo: "officeCondo",
    MixedUseCommercialApartment: "mixedUseCommercialApartment",
    RetailSpace: "retailSpace",
    OfficeSpace: "officeSpace",
    IndustrialSpace: "industrialSpace"
} as const;

export default Object.freeze(feasiblePropertyTypes);