import { BoweryAutomation, BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getTodayDateString } from "../../../../../utils/date.utils";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4471");

const multifamilyMarketResearch: BoweryReports.MarketResearch = {
    neighborhoodValue: "Chester",
    marketArea: "Delaware County",
    state: "PA",
    macroMarket: "PA-Philadelphia",
    submarket: "PA-Lower Delaware County",
    dateOfValuation: getTodayDateString(),
    marketDate: getTodayDateString()
};

const retailMarketResearch: BoweryReports.MarketResearch = {
    neighborhoodValue: "Albany",
    marketArea: "Orange County",
    state: "NY",
    macroMarket: "NY-Albany",
    submarket: "NY-Greater Troy",
    dateOfValuation: getTodayDateString(),
    marketDate: getTodayDateString()
};

const officeMarketResearch: BoweryReports.MarketResearch = {
    neighborhoodValue: "Albany",
    marketArea: "Orange County",
    state: "NY",
    macroMarket: "NY-Long Island",
    submarket: "NY-Western Suffolk",
    dateOfValuation: getTodayDateString(),
    marketDate: getTodayDateString()
};

const industrialMarketResearch: BoweryReports.MarketResearch = {
    neighborhoodValue: "Albany",
    marketArea: "Orange County",
    state: "NY",
    macroMarket: "NY-New York",
    submarket: "NY-Central Queens",
    dateOfValuation: getTodayDateString(),
    marketDate: getTodayDateString()
};

const _researchesUses = [
    {
        research: multifamilyMarketResearch, use: Enums.MARKET_ANALYSIS_USES.MULTIFAMILY
    },
    {
        research: retailMarketResearch, use: Enums.MARKET_ANALYSIS_USES.RETAIL
    },
    {
        research: officeMarketResearch, use: Enums.MARKET_ANALYSIS_USES.OFFICE
    },
    {
        research: industrialMarketResearch, use: Enums.MARKET_ANALYSIS_USES.INDUSTRIAL
    }
];

export default {
    reportCreationData: _reportCreationData,
    researchesUses: _researchesUses
};