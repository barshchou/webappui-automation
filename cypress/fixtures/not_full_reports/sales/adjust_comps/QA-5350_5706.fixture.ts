import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _dateOfValuationFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dateOfValuation,
    date: "01-15-2022"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5350_5706", { incomeValue: Enums.INCOME_TYPE.both }),
    marketConditionAdjustment: 2,
    addressDates: [ new Date(2022, 2, 2), new Date(2022, 3, 1) ],
    dateOfValue: new Date(2022, 1, 15),
    valuationDateFixture: _dateOfValuationFixture,
    comparablesAdjustments: {
        propertyRights: -70,
        financingTerms: 20,
        conditionsOfSale: 5,
        marketConditions: -30,
    },
    tooltipText: "For As Is properties this will calculate a market condition adjustment based " + 
    "on (Subject Date of Value - Comp Date of Sale) / 365 x % Market Condition Adjustment. For Stabilized " + 
    "properties, this will calculate a market condition adjustment based on (Subject Date " + 
    "of Stabilization - Comp Date of Sale) / 365 x % Market Condition Adjustment." 
};