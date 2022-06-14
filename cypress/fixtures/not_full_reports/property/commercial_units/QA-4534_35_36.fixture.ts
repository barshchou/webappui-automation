import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4534_35_36", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: {
        first: 2,
        second: 4,
        third: 0 
    },
};