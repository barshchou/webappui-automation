import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4481");
};

const _neighborhood = "Hannover";
const _area = "Bronx County";
const _state = "PA";
const _neighborhoodYear = 2022;
const _submarketAndMarketQuarter = "Q3";
const _submarketAndMarketYear = 2022;

const _marketAnalysisUses: BoweryReports.MarketAnalysisUses[] = [
    Enums.MARKET_ANALYSIS_USES.multifamily,
    Enums.MARKET_ANALYSIS_USES.retail,
    Enums.MARKET_ANALYSIS_USES.office,
    Enums.MARKET_ANALYSIS_USES.industrial
];

const _multifamilyMarket = "PA-Gettysburg";
const _retailMarket = "PA-Gettysburg";
const _officeMarket = "PA-York";
const _industrialMarket = "PA-York";

const _marketValues: string[] = [
    _multifamilyMarket,
    _retailMarket,
    _officeMarket,
    _industrialMarket
];

const _multifamilySubmarket = "PA-Bronx County";
const _retailSubmarket = "PA-Bronx County";
const _officeSubmarket = "PA-York County";
const _industrialSubmarket = "PA-York County";

const _submarketValues: string[] = [
    _multifamilySubmarket,
    _retailSubmarket,
    _officeSubmarket,
    _industrialSubmarket
];

const _discussion: BoweryReports.PropertyDiscussion = Enums.PROPERTY_DISCUSSION_NAMES.location;

const _commentary = `The subject property is located in the ${_neighborhood} neighborhood of ${_area}.`;

export default {
    reportCreationData: reportCreationFixture(),
    neighborhood: _neighborhood,
    area: _area,
    state: _state,
    neighborhoodYear: _neighborhoodYear,
    submarketAndMarketQuarter: _submarketAndMarketQuarter,
    submarketAndMarketYear: _submarketAndMarketYear,
    marketAnalysisUses: _marketAnalysisUses,
    marketValues: _marketValues,
    submarketValues: _submarketValues,
    discussion: _discussion,
    commentary: _commentary,
    exportSectionName: Enums.EXPORT_TITLES.siteDescription,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.siteDescription ],
    commentName: Enums.PAGES_TEXTBOX_NAMES.locationDescriptionExport
};