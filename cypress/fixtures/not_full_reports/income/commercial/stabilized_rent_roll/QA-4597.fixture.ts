import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportSpecificIncomeValue(enums.INCOME_TYPE.BOTH, "4597"),
    numberOfCommercialUnits: 2,
    value:"=Un",
    verifyListValue: "Unchanged Renovations",
    verifyAreaValue: "Upon renovation, the subject unit count and gross building area will remain unchanged."
};