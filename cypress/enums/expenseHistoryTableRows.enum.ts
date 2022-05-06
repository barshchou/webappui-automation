const tableExpenseHistory = {

    operatingExpensesCell: ["grossRevenue", "realEstateTaxes", "insurance", "electricity", "fuel", "waterAndSewer", "repairsAndMaintenance", "payrollAndBenefits",
        "generalAndAdministrative", "legalAndProfessionalFees", "miscellaneous", "management", "reserves"],
     //   operatingExpensesCell: [
            grossRevenue: "grossRevenue", 
            realEstateTaxes: "realEstateTaxes", 
            insurance:  "insurance", 
            electricity: "electricity", 
            fuel:  "fuel", 
            waterAndSewer: "waterAndSewer", 
            repairsAndMaintenance:  "repairsAndMaintenance", 
            payrollAndBenefits:  "payrollAndBenefits",
            generalAndAdministrative:  "generalAndAdministrative", 
            legalAndProfessionalFees : "legalAndProfessionalFees", 
            miscellaneous :   "miscellaneous", 
            management : "management", 
            reserves:   "reserves",
 //   ]




    totalOperatingExpensesCell: ["total", "totalExcludingTaxes", "noi"]
};

export default Object.freeze(tableExpenseHistory);