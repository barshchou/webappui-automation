const compPropertyPathsInDB = {
    saleStatus: "latestVersion.saleInformation.saleStatus",
    saleCondition: "latestVersion.saleInformation.saleCondition",
    city: "address.city",
    neighborhood: "latestVersion.propertyInformation.neighborhood",
    buildingType: "latestVersion.propertyInformation.buildingType",
    saleTransactionId: "id"
} as const;

const saleStatusValuesInDB = {
    date: "transaction",
    inContract: "underContract",
    listing: "listing"
} as const;

const saleConditionValuesInDB = {
    armsLength: "armsLength",
    nonArmsLength: "nonArmsLength"
} as const;

const neighborhoodValues = {
    williamsburg: "Williamsburg"
} as const;

const buildingTypeValues = {
    elevator: "elevator",
    walkup: "walk-up"
};

export default {
    compPropertyPathsInDB,
    saleStatusValuesInDB,
    saleConditionValuesInDB,
    neighborhoodValues,
    buildingTypeValues
};
   
