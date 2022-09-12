const rentLossType = {
    resRentLossItems: "ResRentLossItems",
    commercialRentLossItems: "CommercialRentLossItems",
    lossItems: "LossItems",
    storage: "storageRentLoss",
    laundry: "laundryRentLoss",
    parking: "parkingRentLoss",
    other: "otherRentLoss",
} as const;

export default Object.freeze(rentLossType);