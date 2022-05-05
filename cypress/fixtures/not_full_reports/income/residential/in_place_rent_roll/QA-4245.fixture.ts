import ReportDataCreator from "../../../../data_creator/reportData.creator";


const occupied: BoweryReports.LeaseStatus = "Occupied";
const vacant: BoweryReports.LeaseStatus = "Vacant";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            footage: 0,
            monthlyRent: 20,
            leaseStatus: occupied
        },
        {
            footage: 0,
            monthlyRent: 60,
            leaseStatus: occupied
        },
        {
            footage: 0,
            monthlyRent: 100,
            leaseStatus: vacant,
        },
        {
            footage: 0,
            monthlyRent: 50,
            leaseStatus: occupied
        },
        {
            footage: 0,
            monthlyRent: 70,
            leaseStatus: vacant
        }
    ];
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4245"),
    numberOfUnits: 5,
    columnName: "Monthly Total",
    residentialUnits: rentRollResidentialUnitsFixture()
};