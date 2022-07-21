const expensesCardsNames = {
    insurance: "insurance",
    electricity: "electricity",
    fuel: "fuel",
    waterAndSewer: "waterSewer",
    repairAndMaintenance: "repairsMaintenance",
    payrollBenefits: "payrollBenefits",
    generalAndAdministrative: "generalAdministrative",
    legalAndProfessional: "legalProfessionalFees",
    miscellaneous: "miscellaneous",
    managementFees: "managementFees",
    replacementsAndReserves: "replacementReserves",
    utilities: "utilities"
} as const;

export default Object.freeze(expensesCardsNames);