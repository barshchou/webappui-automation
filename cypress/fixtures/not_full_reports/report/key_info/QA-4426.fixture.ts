import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = (conclusionValue: BoweryReports.ConclusionValue, reportNumber: string) => {
    return ReportDataCreator.setAddress()
        .setReportNumber(`4426${reportNumber}`)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(conclusionValue).build();
};

type reportConclusionAndTextValues = {
    reportConclusion: BoweryReports.ConclusionValue,
    reportConclusionText: string,
    check: string
}

const _reportConclusionAndTextValues:Array<reportConclusionAndTextValues> = [ 
    {
        reportConclusion: "AS_IS",
        reportConclusionText: "Interest Appraised As Is Market Value selection﻿﻿",
        check: "Interest Appraised As Is Market Value selection"
    },
    {
        reportConclusion: "AS_STABILIZED",
        reportConclusionText: "Interest Appraised As Is Market Value selection﻿﻿",
        check: "Interest Appraised As Is Market Value selection"
    }, 
    {
        reportConclusion: "AS_COMPLETE",
        reportConclusionText: "Interest Appraised As Complete selection﻿﻿",
        check: "Interest Appraised As Complete selection"
    },  
]; 

export default {
    reportConclusionAndTextValues: _reportConclusionAndTextValues
};