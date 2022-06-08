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

export default {
    reportCreationData: ReportDataCreator.getReportData("4416"),
    unitType: "typical" as BoweryReports.UnitType,
    filters: _filters,
    numericFilters: _numericFilters,
    dateFilters: _dateFilters,
    sourceOfInfo: "bowery subject" as BoweryReports.SourceOfInformation,
    amenities: "balcony" as BoweryReports.Amenities
};