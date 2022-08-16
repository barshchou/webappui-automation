import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const inspectorName = "Robocop Inspector";

const generatedComment = "The data contained within this appraisal was compiled from market analysis utilizing" + 
" the following sources (unless otherwise noted): NYC Department of Finance, NYC Department of Buildings, NYC" + 
" Department of Planning Zoning & Land Use, Claritas, CoStar, Federal Reserve, and FEMA. The subject photos" + 
` were taken by ${inspectorName} on Inspection Date, while those used for the comparable rentals and sales` + 
" were sourced from the public domain. When possible, we have confirmed the reported data with parties to the" + 
" transactions or those who are intimately familiar with their critical details.";

export default {
    createReportData: ReportDataCreator.getReportData("4431", {
        templateValue:Enums.TEMPLATE_TYPE.notFreddieMac
    }),
    textBoxName: Enums.PAGES_TEXTBOX_NAMES.dataSourcesDescriptionExport,
    inspectorName,
    generatedComment
};