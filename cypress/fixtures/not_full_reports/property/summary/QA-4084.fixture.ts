import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4084", false, {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // Maximum not included, minimum included
};

const _verifyValues: Array<string> = ["3551.22", "0551.22", "0051.22", "0001.22"];

export default {
    reportCreationData: _reportCreationData,
    verifyValues: _verifyValues,
};