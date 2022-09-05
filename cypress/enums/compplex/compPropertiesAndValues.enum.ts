const compPropertyPathsInDB = {
    saleStatus: "latestVersion.saleInformation.saleStatus",
    sellerName: "latestVersion.saleInformation.seller",
    city: "address.city" 
} as const;

const saleStatusValuesInDB = {
    date: "transaction",
    inContract: "underContract",
    listing: "listing"
} as const;

export default {
    saleStatusValuesInDB,
    compPropertyPathsInDB
};
   
