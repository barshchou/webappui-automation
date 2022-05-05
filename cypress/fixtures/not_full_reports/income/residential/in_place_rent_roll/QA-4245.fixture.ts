import ReportDataCreator from "../../../../data_creator/reportData.creator";

type ResUnitDataItem = {
    leaseStatus: BoweryReports.LeaseStatus,
    rent: number
};

const occupied: BoweryReports.LeaseStatus = "Occupied";
const vacant: BoweryReports.LeaseStatus = "Vacant";

const _firstItem: ResUnitDataItem = {
    leaseStatus: occupied,
    rent: 20
};

const _secondItem: ResUnitDataItem = {
    leaseStatus: occupied,
    rent: 60
};

const _thirdItem: ResUnitDataItem = {
    leaseStatus: vacant,
    rent: 100
};

const _fourthItem: ResUnitDataItem = {
    leaseStatus: occupied,
    rent: 50
};

const _fifthItem: ResUnitDataItem = {
    leaseStatus: vacant,
    rent: 70
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4245"),
    numberOfUnits: 5,
    columnName: "Monthly Total",
    resUnitsData: [
        _firstItem,
        _secondItem,
        _thirdItem,
        _fourthItem,
        _fifthItem
    ]
};