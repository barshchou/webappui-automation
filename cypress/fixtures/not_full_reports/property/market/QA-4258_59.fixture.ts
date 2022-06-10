import { BoweryAutomation, BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getQuarter, getTodayDateString } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4259");

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
    quarterToChange: getQuarter(getTodayDateString(), true, 1)
};