import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4390", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const generalFixture = () => {
    return {
        squareFeet: 190.5,
        rentPerSF: 100,
        annualRent: 20000.156,
        monthlyRent: 550.5
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture())
};