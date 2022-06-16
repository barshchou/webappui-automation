import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData('4543-47', {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const _numberOfCommercialUnits = 2;

export default {
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    textUpdateValue: "Text for test",
    defaultText: "The subject will contain "+ _numberOfCommercialUnits +" commercial units. Commercial unit 1 will be a undetermined space. "+
                "Commercial unit 2 will be a undetermined space."
};