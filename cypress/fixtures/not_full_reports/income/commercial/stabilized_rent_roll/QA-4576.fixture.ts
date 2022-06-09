import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types";

const groupNameFixture: BoweryReports.CommercialUnitsGroups = "Use";
const useRadiosFixture: BoweryReports.CommercialUnitsUseValues[] = [ "retail", "office" ];
const useTextFixture: BoweryReports.CommercialUnitsUseTexts[] = [ "Retail", "Office" ];
const leaseStatusesFixture: BoweryReports.LeaseStatus[] = [ "Vacant", "Occupied" ];
const occupiedLeaseFixture: BoweryReports.LeaseStatus = "Occupied";
const vacantLeaseFixture: BoweryReports.LeaseStatus = "Vacant";
const _leaseDate = "01012022";
const _monthly = "monthly" as BoweryReports.UnitsOfMeasure;
const _compGroup = "QA_4576_Comp_Group";
const _marketRentConclusion = 441;

const _rentCompFields: BoweryReports.RentCompField[] = [
    {
        name: "baseRent",
        value: "12",
        type: "input"
    },
    {
        name: "squareFeet",
        value: "100",
        type: "input"
    },
    {
        name: "tenantName",
        value: "Test",
        type: "input"
    },
    {
        name: "use",
        value: "office" as BoweryReports.CommercialUnitsUseValues,
        type: "dropdown"
    },
    {
        name: "sourceOfInformation",
        value: "bowerySubject",
        type: "dropdown"
    }
];

export default {
    snapshotNames:{
        stabilizedRRPanel:"StabilizedRentRoll_Panel",
        stabilizedRRPanel_severalUnits:"StabilizedRentRoll_Panel_Several_Units",
        stabilizedRRPanel_severalUnits_compGroups:"stabilizedRRPanel_severalUnits_compGroups"
    },
    reportCreationData: ReportDataCreator.getReportData("4576", { incomeValue: Enums.INCOME_TYPE.BOTH }),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [ 1000, 2000 ],
    groupName: groupNameFixture,
    useRadios: useRadiosFixture,
    useTexts: useTextFixture,
    leaseStatuses: leaseStatusesFixture,
    tenantNames: [ "vacant name", "test name" ],
    rentsPsf: [ 100, 120 ],
    annualRent: "$240,000.00",
    monthlyRent: "$20,000.00",
    newTenantName: "new test name",
    comparableFirst: {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        otherNewAdjustment: -20
    },
    comparableSecond: {
        address: "462 1st Avenue, New York, USA",
        sizeAdjustment: 40,
        conditionAdjustment: -10,
        otherAdjustment: -50,
        otherNewAdjustment: 0
    },
    wrongFormatLeaseDate: "25/45/3000",
    occupiedLease: occupiedLeaseFixture,
    vacantLease: vacantLeaseFixture,
    compGroupName: [ "Group1", "Group2" ],
    leaseDate: _leaseDate,
    unitMeasureMontly: _monthly,
    compGroup: _compGroup,
    rentCompFields: _rentCompFields,
    marketRentConclusion: _marketRentConclusion
};