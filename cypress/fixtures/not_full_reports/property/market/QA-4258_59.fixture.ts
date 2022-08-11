import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getPreviousQuarterFromQuarter, getQuarter, getTodayDateString } from "../../../../../utils/date.utils";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4258_59");

const _marketResearch: BoweryReports.MarketResearch = {
    neighborhoodValue: "Albany",
    marketArea: "Orange County",
    state: "NY",
    macroMarket: "NY-Albany",
    submarket: "NY-Greater Troy",
    quarter: getQuarter(getTodayDateString(), true, 2),
    dateOfValuation: getTodayDateString(),
    marketDate: getTodayDateString()
};

export default {
    reportCreationData: _reportCreationData,
    marketResearch: _marketResearch,
    quarterToChange: getQuarter(getTodayDateString()),
    quarterToVerify: getPreviousQuarterFromQuarter(getQuarter(getTodayDateString()))
};
