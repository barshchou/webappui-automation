import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationData : BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5769-70", {
    incomeValue: Enums.INCOME_TYPE.both,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const filePath = "not_full_reports/CostarExport 5161.csv";

const sortSalesCompsValue = 'Date Sold';

    export default {
        reportCreationData,
        sortSalesCompsValue,
        filePath
    };