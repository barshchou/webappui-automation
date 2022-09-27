const names = {
    insurance: "Insurance Forecast Discussion",
    electricity: "Electricity Forecast Discussion",
    fuel: "Fuel Forecast Discussion",
    electricityAndFuel: "Electricity & Fuel Forecast Discussion",
    waterAndSewer: "Water & Sewer Forecast Discussion",
    repairsAndMaintenance: "Repairs & Maintenance Forecast Discussion",
    payrollAndBenefits: "Payroll & Benefits Forecast Discussion",
    generalAndAdministrative: "General & Administrative Forecast Discussion",
    legalAndProfessionalFees: "Legal & Professional Fees Forecast Discussion",
    miscellaneous: "Miscellaneous Forecast Discussion",
    managementFees: "Management Fees Forecast Discussion",
    replacementReserves: "Replacement Reserves Forecast Discussion",
    total: "Generated Commentary"
} as const;

export default Object.freeze(names);