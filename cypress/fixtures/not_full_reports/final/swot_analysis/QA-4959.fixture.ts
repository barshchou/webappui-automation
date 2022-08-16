import enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4959"),
    memoTestDataFile: "threats.txt",
    threats: enums.SWOT_SECTIONS.threats,
    threatsTexts: [
        "Rent growth is limited by local rent control laws. ",
        "In 2022, the Federal Reserve Board increased their benchmark rate by 25 basis points in March" + 
        " and again by 50 basis points at their May meeting in an effort to curb inflation.  The Fed" + 
        " announced that more rate hikes are expected this year. ",
        "As the economy continues its recovery from the global pandemic, there remains uncertainty" + 
        " related to the speed and consistency of the recovery. ",
        "Economic uncertainty and potential market instability related to the war in Ukraine. "
    ]
};