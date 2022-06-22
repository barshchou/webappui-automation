import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5706", { incomeValue: Enums.INCOME_TYPE.both }),
    address: "200 West 78 Street",
    dateFixture: {
        type: "dueDate",
        date: "12-12-2022",
    },
    comparablesAdjustments: {
        propertyRights: -70,
        financingTerms: 20,
        conditionsOfSale: 5,
        marketConditions: -30,
    },
    tooltipText: "For As Is properties this will calculate a market condition adjustment based on (Subject Date of Value - Comp Date of Sale) " +
    "/ 365 x % Market Condition Adjustment. For Stabilized properties, this will calculate a market condition adjustment based on (Subject Date " + 
    "of Stabilization - Comp Date of Sale) / 365 x % Market Condition Adjustment." 
};