import ReportDataCreator from "../../../../data_creator/reportData.creator";

type ResUnitDataItem = {
    leaseStatus: BoweryReports.LeaseStatus,
    rent: number
};

const _firstItem: ResUnitDataItem = {
    leaseStatus: "Occupied",
    rent: 20
};

const _secondItem: ResUnitDataItem = {
    leaseStatus: "Occupied",
    rent: 60
};

const _thirdItem: ResUnitDataItem = {
    leaseStatus: "Vacant",
    rent: 100
};

const _fourthItem: ResUnitDataItem = {
    leaseStatus: "Occupied",
    rent: 50
};

const _fifthItem: ResUnitDataItem = {
    leaseStatus: "Vacant",
    rent: 70
};

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4245"),
    numberOfUnits: 5,
    columnName: "Monthly Total",
    resUnitData: [
        _firstItem,
        _secondItem,
        _thirdItem,
        _fourthItem,
        _fifthItem
    ]
};