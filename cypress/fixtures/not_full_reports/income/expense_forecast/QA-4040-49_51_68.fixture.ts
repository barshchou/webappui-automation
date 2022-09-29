import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4040-49_51_68");
};

const expenseForecastWaterAndSewerFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.waterAndSewer,
        basis: "sf",
        forecast: 2,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.waterAndSewer
    };
};

const expenseForecastReplacementReserveFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.replacementsAndReserves,
        basis: "sf",
        forecast: 2,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.replacementReserves
    };
};

const expenseForecastInsuranceFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.insurance,
        basis: "sf",
        forecast: 4,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.insurance
    };
};

const expenseForecastPayrollAndBenefitsFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.payrollBenefits,
        basis: "sf",
        forecast: 4,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.payrollAndBenefits
    };
};

const expenseForecastRepairAndMaintenanceFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.repairAndMaintenance,
        basis: "sf",
        forecast: 2.1,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.repairsAndMaintenance
    };
};

const expenseForecastElectricityFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.electricity,
        basis: "sf",
        forecast: 5,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.electricity
    };
};

const expenseForecastGeneralAndAdministrativeFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.generalAndAdministrative,
        basis: "sf",
        forecast: 5,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.generalAndAdministrative
    };
};

const expenseForecastMiscellaneousFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.miscellaneous,
        basis: "sf",
        forecast: 5,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.miscellaneous
    };
};

const expenseForecastManagementFeesFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.managementFees,
        basis: "sf",
        forecast: 5,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.managementFees
    };
};

const expenseForecastFuelFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.fuel,
        basis: "sf",
        forecast: 5,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.fuel
    };
};

const expenseForecastLegalAndProfessionalFixture = (): BoweryReports.ForecastItem => {
    return {
        name: Enums.EXPENSES_CARD_NAMES.legalAndProfessional,
        basis: "sf",
        forecast: 6,
        discussionName: Enums.EXPENSE_DISCUSSION_NAMES.legalAndProfessionalFees
    };
};

const waterAndSewerCommentariesFixture = () => {
    return {
        generatedPerSF: "Based on the information above, we have projected this expense " + 
        "at $2.00 per square foot, or $4,248,882 annually.",
        generatedPerUnit: "Based on the information above, we have projected this expense " + 
        "at $2 per unit, or $10 annually.",
    };
};

const replacementReserveCommentariesFixture = () => {
    return {
        generatedPerSF: "This expense provides for the periodic replacement of building components " + 
        "that wear out more rapidly than the building itself and that must be replaced periodically during " + 
        "the building's economic life. We note the owner did not indicate this expense. We have projected this " + 
        "expense at $2.00 per square foot, or $4,248,882 annually.",
        generatedPerUnit: "This expense provides for the periodic replacement of building components that " + 
        "wear out more rapidly than the building itself and that must be replaced periodically during the " + 
        "building's economic life. We note the owner did not indicate this expense. We have projected " + 
        "this expense at $2 per unit, or $10 annually."
    };
};

const insuranceCommentariesFixture = () => {
    return {
        generatedPerSF: "Insurance costs vary by the type of coverage. Costs are generally lower " + 
        "(on a per square foot basis) for larger buildings and for multi-building policies. Based " + 
        "on the information above, we have projected this expense at $4.00 per square foot, " + 
        "or $8,497,764 annually.",
        generatedPerUnit: "Insurance costs vary by the type of coverage. Costs are generally lower " + 
        "(on a per unit basis) for larger buildings and for multi-building policies. Based on the " + 
        "information above, we have projected this expense at $4 per unit, or $20 annually."
    };
};

const payrollAndBenefitsCommentariesFixture = () => {
    return {
        generatedPerSF: "Payroll costs will cover building staff whose duties will include trash " + 
        "removal, common area cleaning and general maintenance. Payroll taxes and fringes cover state " + 
        "and federal taxes as well as benefits that building employees receive. Based on the information " + 
        "above, we have projected this expense at $4.00 per square foot, or $8,497,764 annually.",
        generatedPerUnit: "Payroll costs will cover building staff whose duties will include trash removal, " + 
        "common area cleaning and general maintenance. Payroll taxes and fringes cover state and federal taxes " + 
        "as well as benefits that building employees receive. Based on the information above, we have " + 
        "projected this expense at $4 per unit, or $20 annually.",
    };
};

const repairAndMaintenanceCommentariesFixture = () => {
    return {
        generatedPerSF: "This expense varies depending on building age, management philosophy, " + 
        "services provided, and accounting methodology. Some management companies expense items that are normally " + 
        "included as capital costs. In addition, repair and maintenance costs may change from year to year; in some " + 
        "cases, repairs that require attention may be postponed due to cash flow considerations. Based on the " + 
        "information above, we have projected this expense at $2.10 per square foot, or $4,461,326 annually.",
        generatedPerUnit: "This expense varies depending on building age, management philosophy, " + 
        "services provided, and accounting methodology. Some management companies expense items that " + 
        "are normally included as capital costs. In addition, repair and maintenance costs may change from " + 
        "year to year; in some cases, repairs that require attention may be postponed due to " + 
        "cash flow considerations. Based on the information above, " + 
        "we have projected this expense at $2 per unit, or $11 annually.",
    };
};

const electricityCommentariesFixture = () => {
    return {
        generatedPerSF: "Based on the information above, we have projected this expense " + 
        "at $5.00 per square foot, or $10,622,205 annually.",
        generatedPerUnit: "Based on the information above, we have projected this expense " + 
        "at $5 per unit, or $25 annually."
    };
};

const generalAndAdministrativeCommentariesFixture = () => {
    return {
        generatedPerSF: "This expense allows for any expenditure not included in the above categories " + 
        "including general administrative costs, accounting/legal, permits and dues, miscellaneous " + 
        "charges, office expense, etc. Based on the information above, we have projected this expense " + 
        "at $5.00 per square foot, or $10,622,205 annually.",
        generatedPerUnit: "This expense allows for any expenditure not included in the above categories " + 
        "including general administrative costs, accounting/legal, permits and dues, miscellaneous charges, " + 
        "office expense, etc. Based on the information above, we have " + 
        "projected this expense at $5 per unit, or $25 annually."
    };
};

const miscellaneousCommentariesFixture = () => {
    return {
        generatedPerSF: "Based on the information above, we have projected this " + 
        "expense at $5.00 per square foot, or $10,622,205 annually.",
        generatedPerUnit: "Based on the information above, we have projected this " + 
        "expense at $5 per unit, or $25 annually.",
    };
};

const managementCommentariesFixture = () => {
    return {
        generatedPerSF: "Typically, management fees for similar properties range " + 
        "from 2% to 6% of effective gross income. We have projected this expense at -% of effective gross " + 
        "income, which equates to $5.00 per square foot or $10,622,205 annually.",
        generatedPerUnit: "Typically, management fees for similar properties range from " + 
        "2% to 6% of effective gross income. We have projected this expense at -% of effective " + 
        "gross income, which equates to $5 per unit or $25 annually.",
    };
};

const fuelCommentariesFixture = () => {
    return {
        generatedPerSF: "Based on the information above, our forecast of heating fuel expense is " + 
        "$5.00 per square foot which reflects investor expectations.",
        generatedPerUnit: "Based on the information above, our forecast of heating fuel expense is " + 
        "$5 per unit which reflects investor expectations.",
        generatedPerRoom: "Based on the information above, our forecast of heating fuel expense is " + 
        "$5.00 per room which reflects investor expectations.",
        generatedElectricityAndFuelPerSf: "The tenant is responsible for in-unit electricity and cooking " + 
        "gas. The owner is responsible for common area electricity and heat. Based on the information " + 
        "above, we have projected this expense at $10,622,230 annually.",
        generatedElectricityAndFuelPerUnit: "The tenant is responsible for in-unit electricity and cooking gas. " + 
        "The owner is responsible for common area electricity and heat. Based on the information above, we have " + 
        "projected this expense at $50 annually.",
        generatedElectricityAndFuelPerRoom: "The tenant is responsible for in-unit electricity and " + 
        "cooking gas. The owner is responsible for common area electricity and heat. Based on the " + 
        "information above, we have projected this expense at $25 annually."
    };
};

const legalAndProfessionalCommentariesFixture = () => {
    return {
        generatedPerSF: "Based on the information above, we have projected this expense at " + 
        "$6.00 per square foot, or $12,746,646 annually.",
        generatedPerUnit: "Based on the information above, we have projected this expense at " + 
        "$6 per unit, or $30 annually.",
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    expenseForecastWaterAndSewer: expenseForecastWaterAndSewerFixture(),
    expenseForecastReplacementReserve: expenseForecastReplacementReserveFixture(),
    expenseForecastInsurance: expenseForecastInsuranceFixture(),
    expenseForecastPayrollAndBenefits: expenseForecastPayrollAndBenefitsFixture(),
    expenseForecastRepairAndMaintenance: expenseForecastRepairAndMaintenanceFixture(),
    expenseForecastElectricity: expenseForecastElectricityFixture(),
    expenseForecastGeneralAndAdministrative: expenseForecastGeneralAndAdministrativeFixture(),
    expenseForecastMiscellaneous: expenseForecastMiscellaneousFixture(),
    expenseForecastManagement: expenseForecastManagementFeesFixture(),
    expenseForecastFuel: expenseForecastFuelFixture(),
    expenseForecastLegalAndProfessional: expenseForecastLegalAndProfessionalFixture(),
    commentariesWaterAndSewer: Object.freeze(waterAndSewerCommentariesFixture()),
    commentariesReplacementReserve: Object.freeze(replacementReserveCommentariesFixture()),
    commentariesInsurance: Object.freeze(insuranceCommentariesFixture()),
    commentariesPayrollAndBenefits: Object.freeze(payrollAndBenefitsCommentariesFixture()),
    commentariesRepairAndMaintenance: Object.freeze(repairAndMaintenanceCommentariesFixture()),
    commentariesElectricity: Object.freeze(electricityCommentariesFixture()),
    commentariesGeneralAndAdministrative: Object.freeze(generalAndAdministrativeCommentariesFixture()),
    commentariesMiscellaneous: Object.freeze(miscellaneousCommentariesFixture()),
    commentariesManagement: Object.freeze(managementCommentariesFixture()),
    commentariesFuel: Object.freeze(fuelCommentariesFixture()),
    commentariesLegalAndProfessional: Object.freeze(legalAndProfessionalCommentariesFixture()),
    residentialUnits: 5,
    editedCommentary: "some new adding to commentary"
};