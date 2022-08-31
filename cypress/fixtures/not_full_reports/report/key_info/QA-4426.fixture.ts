import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationFixture = (conclusionValue: BoweryReports.ConclusionValue, reportNumber: string) => {
    return ReportDataCreator.getReportData(`4426${reportNumber}`, { 
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac, 
        incomeValue: Enums.INCOME_TYPE.both, 
        conclusionValue: conclusionValue });
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
    reportConclusionAndTextValues: _reportConclusionAndTextValues,
    color: "rgb(210, 65, 65)",
    exportSectionName: Enums.EXPORT_TITLES.propertyRightsAppraised,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.introduction
};