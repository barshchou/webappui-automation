import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4153", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const checkboxesAttributesFixture = () => {
    return [
        "gross", "modified gross", "tiple-net" ];
};

export default {
    reportCreationData: reportCreationFixture(),
    checkboxesAttributes: Object.freeze(checkboxesAttributesFixture())
};