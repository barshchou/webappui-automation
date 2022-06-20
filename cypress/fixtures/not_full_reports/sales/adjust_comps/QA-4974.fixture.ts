import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4974", { incomeValue: Enums.INCOME_TYPE.commercial }),
    compAddresses: [ "200 West 78 Street", "88 Laight Street" ], 
    verifyColumns: [ "Property Rights", "Financing Terms", "Conditions of Sale", "Market Conditions (Time)", "Better/Worse Neighborhood", 
    "Location within Neighborhood", "Onsite Parking", "Corner Adjustment", "Finishes Adjustment", "Tenant Mix", "Signage", "Floor Area Ratio",
    "Size Adjustment", "Condition Adjustment" ],
    verifyDiscussionHeaders: [ "Unit of Comparison", "Market", "Location", "Utility", "Other" ]
};