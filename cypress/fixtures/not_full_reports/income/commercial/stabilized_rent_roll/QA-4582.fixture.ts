import ReportDataCreator from "../../../../data_creator/reportData.creator";
import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 200,
    numberOfUnits: 3
};

const _leaseStatuses: BoweryReports.LeaseStatus[] = [
    "Vacant",
    "Occupied",
    "Vacant"
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4582", {
        incomeValue: enums.INCOME_TYPE.both
    }),
    buildingDescription: _buildingDescription,
    numberOfCommercialUnits: 3,
    leaseStatuses: _leaseStatuses,
    rentToBe: [ 100, 0, 150 ],
    rentToBe2: [ 200, 0, 350 ],
    commentText: 'test text 1', 
    commentText2: 'test text 2'
};