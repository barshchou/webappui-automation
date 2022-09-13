const amenitiesInputs = {
    storageUnitCount: "building.storageUnitCount",
    parkingSpaceCount: "building.parkingSpaceCount",
    washerDryerUnits: "unit.washerDryerUnits",
    privatePatioUnits: "unit.privatePatioUnits",
    privateBalconyUnits: "unit.privateBalconyUnits",
    privateTerraceUnits: "unit.privateTerraceUnits",
    privateRoofAreaUnits: "unit.privateRoofAreaUnits",
    privateDeckUnits: "unit.privateDeckUnits",
    privateBackyardUnits: "unit.privateBackyardUnits",
    otherUnits: "unit.otherUnits"
} as const;

export default Object.freeze(amenitiesInputs);