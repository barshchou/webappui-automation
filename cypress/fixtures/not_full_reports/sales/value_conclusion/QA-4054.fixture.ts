import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4054", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
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