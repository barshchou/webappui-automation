import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4710", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    commercialUnits: 2,
    leaseStatuses: [ "Occupied", "Vacant" ] as  BoweryReports.LeaseStatus[],
    compAddress: "153 Clinton Street",
    radioButtonNames: [ 
        "per square foot per month", 
        "per square foot per year",
        "monthly",
        "annually" ] as BoweryReports.UnitsOfMeasure[],
    perSquareAndPerMonth: [
        { name: "baseRent", values: [ 10, 12.5, 6.25 ] },
        { name: "baseRent", values: [ 120, 150, 75, 100 ] },
    ],
    monthlyAnnually: [ 
        { sf: "squareFeet",  sfValues: [ 10, 8, 16, 3 ], baseRent: "baseRent", baseRentValues:[ 100, 100, 100, 100 ] }, 
        { sf: "squareFeet", sfValues: [ 2, 2, 2, 100 ], baseRent: "baseRent", baseRentValues:[ 240, 300, 150, 100 ] },
    ],
    sourceValue: {
        name: "sourceOfInformation",
        value: "bowerySubject"
    }
};