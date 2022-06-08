import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationDataAsIs: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    reportCreationDataAsStablized: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    reportCreationDataAsComplet: reportDataCreator.getReportData("4598-00", {
        incomeValue: enums.INCOME_TYPE.BOTH,
        conclusionValue: enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    numberOfCommercialUnits: 2,
    value:"=Un",
    verifyListValue: "Unchanged Renovations",
    verifyAreaValue: "Upon renovation, the subject unit count and gross building area will remain unchanged."
};