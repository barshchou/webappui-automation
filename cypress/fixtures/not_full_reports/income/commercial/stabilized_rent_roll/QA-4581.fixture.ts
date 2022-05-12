import ReportDataCreator from "../../../../data_creator/reportData.creator";
import enums from "../../../../../enums/enums";

const _buildingDescription: BoweryReports.BuildingDescription = {
    grossArea: 200,
    numberOfUnits: 3
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4581", {
        incomeValue: enums.INCOME_TYPE.BOTH
    }),
    buildingDescription: _buildingDescription,
    numberOfCommercialUnits: 3,
    isInspected: [ true, false, true ],
    leaseStatuses: [ "Vacant", "Occupied", "Vacant" ] as Array<BoweryReports.LeaseStatus>,
    rentToBe: [ 100, 0, 150 ]
};