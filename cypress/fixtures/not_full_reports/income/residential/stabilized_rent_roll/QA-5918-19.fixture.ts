import enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const rentRollResidentialUnitsFixture = () : BoweryReports.ResidentialUnit[] => {
    return [
        {
            footage: 100,
            monthlyRent: 500.01,
            leaseStatus: "Vacant",
        }
    ];
};

export default {
    reportCreationData: ReportDataCreator.getReportData("5918-19"),
    residentialUnits: rentRollResidentialUnitsFixture(),
    basisForSquareFootAnalysis: [ 
        enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea,
        enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
        enums.BASIS_SQUARE_FOOT_ANALYSIS.netLeasableArea,
        enums.BASIS_SQUARE_FOOT_ANALYSIS.netRentableArea
    ]
};