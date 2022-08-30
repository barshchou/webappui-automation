import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const notFreddieMacReport = ReportDataCreator.getReportData("6036", {
    templateValue:Enums.TEMPLATE_TYPE.notFreddieMac
});

const freddieMacReport = ReportDataCreator.getReportData("6129");

const inspectorName = "Robocop Inspector";

const notFreddieMacComment = "The data contained within this appraisal was compiled from market analysis utilizing" + 
" the following sources (unless otherwise noted): NYC Department of Finance, NYC Department of Buildings, NYC" + 
" Department of Planning Zoning & Land Use, Claritas, CoStar, Federal Reserve, and FEMA. The subject photos" + 
` were taken by ${inspectorName} on Inspection Date, while those used for the comparable rentals and sales` + 
" were sourced from the public domain. When possible, we have confirmed the reported data with parties to the" + 
" transactions or those who are intimately familiar with their critical details.";

const freddieMacComment = "The data contained within this appraisal was compiled from market analysis utilizing" + 
" the following sources (unless otherwise noted): NYC Department of Finance, NYC Department of Buildings, NYC" + 
" Department of Planning Zoning & Land Use, Claritas, CoStar, Federal Reserve, and FEMA. The subject photos" + 
` were taken by Report Inspectors on Inspection Date, while those used for the comparable rentals and sales` + 
" were sourced from the public domain. When possible, we have confirmed the reported data with parties to the" + 
" transactions or those who are intimately familiar with their critical details.";

const dataReportFixtures = [ 
    {
        fixture: notFreddieMacReport,
        testName: "[QA-6036]",
        comment: notFreddieMacComment
    },
    {
        fixture: freddieMacReport,
        testName: "[QA-6129]",
        comment: freddieMacComment
    } 
];

export default {
    dataReportFixtures,
    textBoxName: Enums.PAGES_TEXTBOX_NAMES.dataSourcesDescriptionExport,
    inspectorName,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.introduction
};