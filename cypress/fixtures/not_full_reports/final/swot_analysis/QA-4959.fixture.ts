import enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4959"),
    threats: enums.SWOT_SECTIONS.threats,
    threatsTexts: [
        "Rent growth is limited by local rent control laws.",
        "On July 27th, 2022, the Federal Reserve Board increased their benchmark rate by 75 basis points," + 
        " the fourth increase this year in an effort to curb inflation. There was a 25 basis point increase" + 
        " in March and a 50 basis point increase in May, followed by 75 bps in June and 75 bps again in July." + 
        " It is likely that the Federal Reserve Board will announce additional rate hikes later this year.",
        "As the economy continues its recovery from the global pandemic, there remains uncertainty" +
        " related to the speed and consistency of the recovery.",
        "Economic uncertainty and potential market instability related to the war in Ukraine.",
    ],
    exportSectionName: enums.EXPORT_TITLES.threats
};