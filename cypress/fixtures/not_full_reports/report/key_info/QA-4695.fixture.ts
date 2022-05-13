import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress()
    .setReportNumber("4695")
    .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
    .setIncomeValue(Enums.INCOME_TYPE.BOTH)
    .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    reportCreationData: reportCreationFixture(),
};