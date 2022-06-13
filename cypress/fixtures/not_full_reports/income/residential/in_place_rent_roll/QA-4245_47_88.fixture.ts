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

const _leaseStatusFixture = [ occupied, vacant ] as BoweryReports.LeaseStatus[];

const _textValues = [
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
    the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    42, 
    "%&#*($#(*!@)$#", 
    "test", 
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4245_47_88"),
    numberOfUnits: 5,
    columnName: "Monthly Total",
    residentialUnits: rentRollResidentialUnitsFixture(),
    textValues: _textValues,
    tooltipText: "The following generated text will appear in the Income Approach's Current Residential Rent Roll.",
    leaseStatusData: _leaseStatusFixture
};