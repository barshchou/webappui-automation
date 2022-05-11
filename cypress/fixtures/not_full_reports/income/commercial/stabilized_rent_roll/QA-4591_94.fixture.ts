import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

const _numberOfCommercialUnits = 2;

export default {
    reportCreationData: reportDataCreator.getReportData("4591_94", {
        incomeValue: enums.INCOME_TYPE.BOTH
    }),
    numberOfCommercialUnits: _numberOfCommercialUnits,
    value:"Some text update",
    defaultText: "The subject contains "+ _numberOfCommercialUnits +" commercial units.﻿﻿ The terms are summarized below."
};
