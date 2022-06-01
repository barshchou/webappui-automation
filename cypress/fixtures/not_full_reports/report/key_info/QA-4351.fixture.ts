import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("1764459005", { 
        templateValue: Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC, 
        incomeValue: Enums.INCOME_TYPE.BOTH, 
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE }, true);
};

export default {
    reportCreationData: reportCreationFixture(),
    namesInputByQA: [ "dateOfValuation", "inspectionDate" ] as Array<string>,
    verifyDate: "03-02-2021"
};