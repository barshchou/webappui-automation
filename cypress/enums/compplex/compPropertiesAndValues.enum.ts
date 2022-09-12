const compPropertyPathsInDB = {
    saleStatus: "latestVersion.saleInformation.saleStatus",
    saleCondition: "latestVersion.saleInformation.saleCondition",
    city: "address.city" 
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

export default {
    compPropertyPathsInDB,
    saleStatusValuesInDB,
    saleConditionValuesInDB
};
   
