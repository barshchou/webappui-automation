import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4481");
};

const _neighborhood = "Hannover";
const _area = "Adams County";
const _state = "PA";
const _neighborhoodYear = "2022";
const _submarketAndMarketQuarter = "Q3";
const _submarketAndMarketYear = "2022";

const _marketAnalysisUses: BoweryReports.MarketAnalysisUses[] = [
    "multifamily",
    "retail",
    "office",
    "industrial"
];

const _multifamilyMarket = "PA-Gettysburg";
const _retailMarket = "PA-Gettysburg";
const _officeMarket = "PA-York";
const _industrialMarket = "PA-York";

const _multifamilySubmarket = "PA-Adams County";
const _retailSubmarket = "PA-Adams County";
const _officeSubmarket = "PA-York County";
const _industrialSubmarket = "PA-York County";

export default {
    reportCreationData: reportCreationFixture(),
    neighborhood: _neighborhood,
    area: _area,
    state: _state,
    neighborhoodYear: _neighborhoodYear,
    submarketAndMarketQuarter: _submarketAndMarketQuarter,
    submarketAndMarketYear: _submarketAndMarketYear,
    marketAnalysisUses: _marketAnalysisUses,
    multifamilyMarket: _multifamilyMarket,
    retailMarket: _retailMarket,
    officeMarket: _officeMarket,
    industrialMarket: _industrialMarket,
    multifamilySubmarket: _multifamilySubmarket,
    retailSubmarket: _retailSubmarket,
    officeSubmarket: _officeSubmarket,
    industrialSubmarket: _industrialSubmarket
};