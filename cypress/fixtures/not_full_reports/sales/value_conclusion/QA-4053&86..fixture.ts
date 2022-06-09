import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4053", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const generalFixture = () => {
    return {
        residentialUnits: 12,
        commercialUnits: 3,
        valueConclusion: 750,
    };
};

export default {
    reportCreationData: _reportCreationData,
    general: Object.freeze(generalFixture())
};