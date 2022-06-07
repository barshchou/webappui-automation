import ReportDataCreator from "../../../../data_creator/reportData.creator";


const occupied: BoweryReports.LeaseStatus = "Occupied";
const vacant: BoweryReports.LeaseStatus = "Vacant";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            footage: 0,
            monthlyRent: 10,
            leaseStatus: occupied
        },
        {
            footage: 0,
            monthlyRent: 10.22,
            leaseStatus: occupied
        },
        {
            footage: 0,
            monthlyRent: 10.3332,
            leaseStatus: vacant,
        },
        {
            footage: 0,
            monthlyRent: 10.1,
            leaseStatus: occupied
        },
        {
            footage: 0,
            monthlyRent: 0.00,
            leaseStatus: vacant
        }
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4698"),
    numberOfUnits: 5,
    columnName: "Monthly Total",
    residentialUnits: rentRollResidentialUnitsFixture()
};