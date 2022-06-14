import { BoweryAutomation } from "../../../../../../types";
import ReportDataCreator from "../../../../../data_creator/reportData.creator";


const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4177-79");

export default {
    reportCreationData: _reportCreationData,
    compAddress: "508 Broadway",
    regularResNum: 5,
    otherRegularResNum: 3,
    stringResNumb: "!@#$%^&*()?Some text",
    rooms: 5,
    bedrooms: 2,
    squareFeet: 1500,
    monthlyRent: 20000.598
};