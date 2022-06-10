import { BoweryReports } from "../../../../../types";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _filters: BoweryReports.RentCompsFilter[] = [
    {
        name: "Unit Type",
        value: "typical" as BoweryReports.UnitType
    },
    {
        name: "Bedrooms",
        value: "0"
    }
];

const _numericFilters: BoweryReports.RentCompsFilter[] = [
    {
        name: "minRent",
        value: 10
    },
    {
        name: "minSF",
        value: 10
    }
];

const _dateFilter: BoweryReports.RentCompsFilter = {
        name: "min",
        value: "01-01-2022"
    };

export default {
    reportCreationData: ReportDataCreator.getReportData("4419"),
    unitType: "typical" as BoweryReports.UnitType,
    filters: _filters,
    numericFilters: _numericFilters,
    dateFilter: _dateFilter,
    sourceOfInfo: "bowery subject" as BoweryReports.SourceOfInformation,
    amenities: "balcony" as BoweryReports.Amenities
};