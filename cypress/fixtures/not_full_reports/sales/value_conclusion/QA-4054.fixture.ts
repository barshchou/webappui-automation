import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress().getReportData("4054")
        .setTemplateValue(Enums.TEMPLATE_TYPE.FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE);
};

const dataFixture = () => {
    return {
        numberOfResUnits: 2,
        numberOfCommercialUnits: 3,
        totalNumberOfUnitsLabel: "5",
        calculationUnits: "Per Total Units",
        valueColumnLabel: "# of Units"
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    data: Object.freeze(dataFixture())
};