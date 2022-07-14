import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4608", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _streetName = "462 1st Avenue";
const _numberOfCommercialUnits = 2;
const _commercialUnitSf = [ 32, 50, 82 ];
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

const _exportData = [
    {
        name: "Tenant",
        values: [ "Commercial Unit 1", _tenantName ],
    },
    {
        name: "Use",
        values: [
            Enums.COMMERCIAL_UNITS_USE_TEXTS.retail,
            Enums.COMMERCIAL_UNITS_USE_TEXTS.undetermined
        ]
    },
    {
        name: "Lease Terms",
        values: [
            "-", "-"
        ]
    },
    {
        name: "Lease Status",
        values: _leaseStatuses
    },
    {
        name: "Start Date",
        values: [ "-", _leaseDates[0].value ]
    },
    {
        name: "Expiration Date",
        values: [ "-", _leaseDates[1].value ]
    },
    {
        name: "SF",
        values: _commercialUnitSf
    },
    {
        name: "Annual Rent",
        values: [ "$281,536", "$27,500", "$309,036" ]
    },
    {
        name: "Monthly Rent",
        values: [ "$23,461", "$2,292", "$25,753" ]
    },
    {
        name: "Rent PSF",
        values: [ "$8,798.00", "$550.00", "$3,768.73" ]
    }
];

const _totalRowName = "Totals";

export default {
    streetName: _streetName,
    leaseDate: _leaseDate,
    address: _address,
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    listOfUnitsSF: _commercialUnitSf,
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
    exportData: _exportData,
    totalRowName: _totalRowName
};