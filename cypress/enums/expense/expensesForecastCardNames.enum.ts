const expensesCardsNames = {
    insurance: "insurance",
    electricity: "electricity",
    fuel: "fuel",
    waterAndSewer: "waterAndSewer",
    repairAndMaintenance: "repairsAndMaintenance",
    payrollBenefits: "payrollAndBenefits",
    generalAndAdministrative: "generalAndAdministrative",
    legalAndProfessional: "legalAndProfessionalFees",
    miscellaneous: "miscellaneous",
    managementFees: "management",
    replacementsAndReserves: "reserves",
    utilities: "utilities"
} as const;

export default Object.freeze(expensesCardsNames);