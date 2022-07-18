import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4189_4712", {
    incomeValue: Enums.INCOME_TYPE.both
});

const _leaseStatuses: BoweryReports.LeaseStatus[] = [ "Occupied", "Occupied" ];
const _rentPSFs: number[] = [ 100, 200 ];

const _rentCompFields = [
    {
        name: "baseRent",
        value: "120",
        type: "input",
        rentSf: 10.00
    },
    {
        name: "baseRent",
        value: "150",
        type: "input",
        rentSf: 12.50
    },
    {
        name: "baseRent",
        value: "75",
        type: "input",
        rentSf: 6.25
    },
    {
        name: "baseRent",
        value: "100",
        type: "input",
        rentSf: 8.33
    }
];

const _sourceOfInformation = {
    name: "sourceOfInformation",
    value: "bowerySubject",
    type: "dropdown"
};

export default {
    reportCreationData: _reportCreationData,
    leaseStatuses: _leaseStatuses,
    unitsNumber: 2,
    numberOfComparables: 4,
    rentPSFs: _rentPSFs,
    compGroupName: "TestCompGroup_4189",
    rentPSFLabelName: "Rent/SF/Month",
    unitsOfMeasure: Enums.UNITS_OF_MEASURE.perSquareFootPerYear,
    rentCompFields: _rentCompFields, 
    sourceOfInformation: _sourceOfInformation
};