import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _unitType: BoweryReports.UnitType = "typical";
const _sourceOfInfo: BoweryReports.SourceOfInformation = "bowery subject";
const _amenities: BoweryReports.Amenities = "balcony";

const _filters: BoweryReports.RentCompsFilter[] = [
    {
        name: "Unit Type",
        value: _unitType
    },
    {
        name: "Bedrooms",
        value: "0"
    },
    {
        name: "Source of Information",
        value: _sourceOfInfo
    },
    {
        name: "Amenities",
        value: _amenities
    }
];

const _numericFilters: BoweryReports.RentCompsFilter[] = [
    {
        name: "minRent",
        value: 10
    },
    {
        name: "maxRent",
        value: 5000
    },
    {
        name: "minSF",
        value: 10
    },
    {
        name: "maxSF",
        value: 5000
    }
];

const _dateFilters: BoweryReports.RentCompsFilter[] = [
    {
        name: "min",
        value: "01-01-2022"
    },
    {
        name: "max",
        value: "12-01-2022"
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4402_07_15_18-19"),
    unitType: _unitType,
    filters: _filters,
    numericFilters: _numericFilters,
    dateFilters: _dateFilters,
    sourceOfInfo: _sourceOfInfo,
    amenities: _amenities
};