/* eslint-disable max-len */
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4477");
const _title = "Definition of Market Value";
const _definitionOfMarketValueList: string[] = [
    `buyer and seller are typically motivated;`,
    `both parties are well informed or well advised, and each acting in what he or she considers his or her own best interest;`,
    `a reasonable time is allowed for exposure in the open market;`,
    `payment is made in terms of cash in U.S. dollars or in terms of financial arrangements comparable thereto; and`,
    `the price represents the normal consideration for the property sold unaffected by special or creative financing or sales concessions granted by anyone associated with the sale.`
];

export default {
    reportCreationData: _reportCreationData,
    title: _title,
    definitionOfMarketValueList: _definitionOfMarketValueList
};