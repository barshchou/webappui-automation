const incomeTypeCellNames = {
    potentialResidentialIncome: "potentialResidentialIncome", 
    otherIncome: "otherIncome",
    potentialGrossIncome: "potentialGrossIncome",
    effectiveGrossIncome: "effectiveGrossIncome",
    potentialRealEstateTaxesReimbursement: "potentialRealEstateTaxesReimbursement",
    parkingIncome: "parkingIncome",
    laundryIncome: "laundryIncome",
    storageIncome: "storageIncome"
} as const;

export default Object.freeze(incomeTypeCellNames);