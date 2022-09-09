import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData(Enums.REPORT_TYPES_SF.withoutFreddieMac, { 
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac, 
        incomeValue: Enums.INCOME_TYPE.both, 
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE }, true);
};

const appraisers = [
    {
        name: "Robocop Automation",
        isPersonallyInspected: false
    },
    {
        name: "Rose Carrillo",
        isPersonallyInspected: false
    },
    {
        name: "Sherif Elshoubri",
        isPersonallyInspected: false
    },
    {
        name: "Tim Lam",
        isPersonallyInspected: true
    },
];

export default {
    reportCreationData: reportCreationFixture(),
    appraisers
};