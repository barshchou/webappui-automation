import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4607", {
    incomeValue: Enums.INCOME_TYPE.BOTH
});

const _grossBuildingArea = 5000;
const _numberOfCommercialUnits = 3;
const _commercialUnitSf = [ 100000, 120000, 145000 ];
const _leaseStatuses: Array<BoweryReports.LeaseStatus> = [ "Vacant", "Vacant", "Vacant" ];
const _commercialRentSf = [ 499, 1256.12, 777.99 ];
const _address = "462 1st Avenue, New York, USA";
const _leaseDate = "01012022";

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
    rentsPsf: _commercialRentSf,
    rentCompFields: _rentCompFields,
    leaseDate: _leaseDate
};