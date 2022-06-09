import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4087", {
    incomeValue: Enums.INCOME_TYPE.BOTH,
    conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
});

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // Maximum not included, minimum included
};

const _verifyValues: Array<number> = [ 0, getRandomInt(1, 4999), 4999, 5000, 5001, 1000000 ];

export default {
    reportCreationData: _reportCreationData,
    verifyValues: _verifyValues,
    notInclude: [ "+", "-", "*", "/", "=", "%", "@", "^", ">", "<", "~" ]
};