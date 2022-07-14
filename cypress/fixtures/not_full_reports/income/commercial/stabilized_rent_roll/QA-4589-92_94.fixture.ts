import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

const _numberOfCommercialUnits = 2;

export default {
    reportCreationData: reportDataCreator.getReportData("4589-92_94", {
        incomeValue: enums.INCOME_TYPE.both
    }),
    numberOfCommercialUnits: _numberOfCommercialUnits,
    textUpdateValue:"Some text update",
    defaultText: "The subject contains "+ _numberOfCommercialUnits +" commercial units. The terms are summarized below."
};
