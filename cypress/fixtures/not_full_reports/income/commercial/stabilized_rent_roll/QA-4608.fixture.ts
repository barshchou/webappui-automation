import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4608", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _streetName = "462 1st Avenue";
const _numberOfCommercialUnits = 2;
const _commercialUnitSfValues = [ 32, 50, 82 ];
const _commercialUnitGroup: BoweryReports.CommercialUnits.Groups = Enums.COMMERCIAL_UNITS_GROUPS.use;
const _commercialUnitGroupValue: BoweryReports.CommercialUnits.GroupsValues = Enums.COMMERCIAL_UNITS_USE_VALUES.retail;
const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Vacant", "Occupied" ];
const _tenantName = "Tenant_test1";
const _rentPSF = 550;



const _leaseDates = [
    {
        name: "Start" as BoweryReports.LeaseDateName,
        value: "10/10/2010"
    },
    {
        name: "Expiry" as BoweryReports.LeaseDateName,
        value: "09/20/2022"
    }
];

const _leaseDate = "01-01-2022";
const _address = "462 1st Avenue, New York, USA";
const _compGroup = "Test";
const _marketRentConclusion = "8798";

const _rentCompFields: BoweryReports.RentCompField[] = [
    {
        name: "baseRent",
        value: "8798",
        type: "input"
    },
    {
        name: "squareFeet",
        value: "32",
        type: "input"
    },
    {
        name: "tenantName",
        value: "Commercial Unit 1",
        type: "input"
    },
    {
        name: "use",
        value: "retail" as BoweryReports.CommercialUnits.UseValues,
        type: "dropdown"
    },
    {
        name: "sourceOfInformation",
        value: "bowerySubject",
        type: "dropdown"
    }
];

const _exportedTableColumnNames: string[] = [
    "Tenant",
    "Use",
    "Lease Terms",
    "Lease Status",
    "Start Date",
    "Expiration Date",
    "SF",
    "Annual Rent",
    "Monthly Rent",
    "Rent PSF"
];

const _totalRowName = "Totals";

const _tenantNames: string[] = [ "Commercial Unit 1", _tenantName ];
const _useValues: string[] = [
    Enums.COMMERCIAL_UNITS_USE_TEXTS.retail,
    Enums.COMMERCIAL_UNITS_USE_TEXTS.undetermined
];
const _leaseTermsValues: string[] = [ "-", "-" ];
const _startDates: string[] = [ "-", _leaseDates[0].value ];
const _expirationDates: string[] = [ "-", _leaseDates[1].value ];
const _annualRents: string[] = [ "$281,536", "$27,500", "$309,036" ];
const _monthlyRents: string[] = [ "$23,461", "$2,292", "$25,753" ];
const _rentsPSF: string[] = [ "$8,798.00", "$550.00", "$3,768.73" ];

const _exportTableValues = [
    _tenantNames,
    _useValues,
    _leaseTermsValues,
    _leaseStatuses,
    _startDates,
    _expirationDates,
    _commercialUnitSfValues,
    _annualRents,
    _monthlyRents,
    _rentsPSF
];

export default {
    streetName: _streetName,
    leaseDate: _leaseDate,
    address: _address,
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    commercialUnitSfValues: _commercialUnitSfValues,
    commercialUnitGroup: _commercialUnitGroup,
    commercialUnitGroupValue: _commercialUnitGroupValue,
    leaseStatuses: _leaseStatuses,
    tenantName: _tenantName,
    rentPSF: _rentPSF,
    leaseDates: _leaseDates,
    rentCompFields: _rentCompFields,
    compGroup: _compGroup,
    marketRentConclusion: _marketRentConclusion,
    compsAmount: 1,
    exportTableValues: _exportTableValues,
    totalRowName: _totalRowName,
    exportedTableColumnNames: _exportedTableColumnNames,
    exportSectionName: Enums.EXPORT_TITLES.commercialStabilizedRentRoll,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.incomeCapitalizationApproach ]
};