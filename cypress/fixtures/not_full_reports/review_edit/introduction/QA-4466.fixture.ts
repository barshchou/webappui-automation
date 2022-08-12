import Enums from "../../../../enums/enums";
import { _PropertyTitles } from "../../../../enums/pages_titles";
import ReportDataCreator from "../../../data_creator/reportData.creator";



export default {
    reportCreationData: ReportDataCreator.getReportData("4466"),
    typeValue: "Test values",
    textBoxName: Enums.PAGES_TEXTBOX_NAMES.marketingTimeDescription,
    backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.marketingTime,
    pageName: _PropertyTitles.MARKET,
};