import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const otherReport = (): BoweryAutomation.ReportCreationData => {
    return {
        state: "Other",
        address: "8524 South Oglesby Avenue",
        identifierType: "PIN",
        identifier: "20-36-420-020-0000",
        reportNumber: "TestAutoReport-4431",
        isSalesForcePull: false,
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.residential,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

const chipNames = [
    Enums.CHIPS.reportInspectors,
    Enums.CHIPS.inspectionDate
];

const nycComment = "The data contained within this appraisal was compiled from market analysis utilizing" + 
" the following sources (unless otherwise noted): NYC Department of Finance, NYC Department of Buildings," +
" NYC Department of Planning Zoning & Land Use, Claritas, CoStar, Federal Reserve, and FEMA. The subject" + 
` photos were taken by ${chipNames[0]} on ${chipNames[1]}, while those used for the comparable rentals` + 
" and sales were sourced from the public domain. When possible, we have confirmed the reported data with" + 
" parties to the transactions or those who are intimately familiar with their critical details.";

const otherComment = "The data contained within this appraisal was compiled from market analysis utilizing" + 
" the following sources (unless otherwise noted): the City Tax Assessor, state and county tax records, the" + 
" Zoning Board, Claritas, CoStar, Federal Reserve, and FEMA. The subject photos were taken by" +
` ${chipNames[0]} on ${chipNames[1]}, while those used for the comparable rentals and sales were sourced from` + 
" the public domain. When possible, we have confirmed the reported data with parties to the transactions" + 
" or those who are intimately familiar with their critical details.";

export default {
    nycReport: ReportDataCreator.getReportData("4431"),
    otherReport: otherReport(),
    textBoxName: Enums.PAGES_TEXTBOX_NAMES.dataSourcesDescriptionExport,
    nycComment,
    otherComment,
    chipNames,
    color: "rgb(210, 65, 65)",
    backgroundColor: "rgb(255, 233, 233)",
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.introduction
};