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
    },
    {
        name: "Source of Information",
        value: "bowery subject" as BoweryReports.SourceOfInformation
    },
    {
        name: "Amenities",
        value: "balcony" as BoweryReports.Amenities
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

const _unitType: BoweryReports.UnitType = "typical";
const _sourceOfInfo: BoweryReports.SourceOfInformation = "bowery subject";
const _amenities: BoweryReports.Amenities = "balcony";

export default {
    reportCreationData: ReportDataCreator.getReportData("4415"),
    unitType: _unitType,
    filters: _filters,
    numericFilters: _numericFilters,
    dateFilters: _dateFilters,
    sourceOfInfo: _sourceOfInfo,
    amenities: _amenities
};