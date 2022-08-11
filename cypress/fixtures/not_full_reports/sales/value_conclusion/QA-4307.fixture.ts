import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _valuationDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dateOfValuation,
    date: "10-13-2021"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4307", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    dateOfValuation: _valuationDateFixture
};