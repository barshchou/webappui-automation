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

const comparableFixture1 = {
        address: "200 West 78 Street"
};

const comparableFixture2 = () => {
    return {
        address: "626 1 Avenue" 
    };
};

const comparableFixture3 = () => {
    return {
        address: "45 East 45 Street" 
    };
};

    export default {
        comparableFixture1,
        comparableFixture2,
        comparableFixture3,
        reportCreationData,
        sortSalesCompsValue,
        filePath
    };