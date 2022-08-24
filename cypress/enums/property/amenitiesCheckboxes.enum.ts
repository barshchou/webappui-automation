const amenitiesCheckboxes = {
    hasNoAmenities: "hasNoAmenities",
    hasLaundryRoom: "building.hasLaundryRoom",
    hasStorageUnits: "building.hasStorageUnits",
    hasParking: "building.hasParking",
    hasOutdoorSpace: "building.hasOutdoorSpace",
    hasDoorman: "building.hasDoorman",
    hasBikeRoom: "building.hasBikeRoom",
    hasGym: "building.hasGym",
    hasPool: "building.hasPool",
    hasRecreationRoom: "building.hasRecreationRoom",
    hasCommonLoungeSpace: "building.hasCommonLoungeSpace",
    hasOnSiteSuperintendent: "building.hasOnSiteSuperintendent",
    hasNoUnitAmenities: "hasNoUnitAmenities",
    hasWasherDryer: "unit.hasWasherDryer",
    hasPrivatePatio: "unit.hasPrivatePatio",
    hasPrivateBalcony: "unit.hasPrivateBalcony",
    hasPrivateTerrace: "unit.hasPrivateTerrace",
    hasPrivateRoofArea: "unit.hasPrivateRoofArea",
    hasPrivateDeck: "unit.hasPrivateDeck",
    hasPrivateBackyard: "unit.hasPrivateBackyard",
    hasOtherUnitAmenity: "unit.hasOtherUnitAmenity"
} as const;

export default Object.freeze(amenitiesCheckboxes);