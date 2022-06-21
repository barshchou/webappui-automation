import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const groupNameFixture: BoweryReports.CommercialUnits.Groups = "Use";
const useRadiosFixture: BoweryReports.CommercialUnits.UseValues[] = [ "retail", "office" ];
const useTextFixture: BoweryReports.CommercialUnits.UseTexts[] = [ "Retail", "Office" ];
const _leaseStatusesMixed: BoweryReports.LeaseStatus[] = [ "Vacant", "Occupied" ];
const _leaseStatusesVacant: BoweryReports.LeaseStatus[] = [ "Vacant", "Vacant" ];
const _leaseStatusesOccupied: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied" ];
const _leaseDate = "01012022";
const _compGroup = "QA_4576_Comp_Group";
const _monthly = "monthly" as BoweryReports.UnitsOfMeasure;
const _marketRentConclusion = 333;

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
        value: "office" as BoweryReports.CommercialUnits.UseValues,
        type: "dropdown"
    },
    {
        name: "sourceOfInformation",
        value: "bowerySubject",
        type: "dropdown"
    }
];


export default {
    reportCreationData: ReportDataCreator.getReportData("4586", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    numberOfCommercialUnits: 2,
    listOfUnitsSF: [ 1000, 2000 ],
    groupName: groupNameFixture,
    useRadios: useRadiosFixture,
    useTexts: useTextFixture,
    leaseStatusesMixed: _leaseStatusesMixed,
    leaseStatusesVacant: _leaseStatusesVacant,
    leaseStatusesOccupied: _leaseStatusesOccupied,
    rentsPsf: [ 100, 120 ],
    unitsOfMeasure: "annually" as BoweryReports.UnitsOfMeasure,
    compGroup: _compGroup,
    rentCompFields: _rentCompFields,
    leaseDate: _leaseDate,
    unitMeasureMontly: _monthly,
    comparableFirst: {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        otherNewAdjustment: -20
    },
    marketRentConclusion: _marketRentConclusion
};