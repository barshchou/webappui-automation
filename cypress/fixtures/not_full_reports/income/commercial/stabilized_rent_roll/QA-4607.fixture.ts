import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation, BoweryReports } from "../../../../../types";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4607", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 2;
const _commercialUnitSf = [ 100000, 120000 ];
const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Vacant", "Vacant" ];
const _address = "462 1st Avenue, New York, USA";
const _leaseDate = "01012022";
const _compGroup = "QA_4607_Comp_Group";
const _marketRentConclusion = 332;
const _unitsOfMeasure = "annually" as BoweryReports.UnitsOfMeasure;

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
    address: _address,
    reportCreationData: _reportCreationData,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    grossBuildingArea: _grossBuildingArea,
    listOfUnitsSF: _commercialUnitSf,
    leaseStatuses: _leaseStatuses,
    rentCompFields: _rentCompFields,
    leaseDate: _leaseDate,
    compGroup: _compGroup,
    marketRentConclusion: _marketRentConclusion, 
    unitsOfMeasure: _unitsOfMeasure,
    compsAmount: 1
};