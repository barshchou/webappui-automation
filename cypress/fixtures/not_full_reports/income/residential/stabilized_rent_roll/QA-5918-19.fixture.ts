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

const _squareFootAnalysisFixture = [
    {
        name: "Gross Building Area",
        basis: enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea,
        area: 3000,
        distributionSummaryNoSquareFootage: "We estimated the total leasable area and resulting average square "+
            "footage per unit based on a loss factor of 10% applied to the gross building area.",
        distributionSummaryYesSquareFootage: "The total leasable area and average square footage per unit was " +
            "provided by the owner based on a loss factor of 10% of the gross building area."
    },
    {
        name: "Gross Leasable Area",
        basis: enums.BASIS_SQUARE_FOOT_ANALYSIS.grossLeasableArea,
        area: 3000,
        distributionSummaryNoSquareFootage: 
        "The gross leasable area and average square footage per unit was provided by the owner.",
        distributionSummaryYesSquareFootage: 
        "The gross leasable area and square footage per unit was provided by the owner."
    },
    {
        name: "Net Rentable Area",
        basis: enums.BASIS_SQUARE_FOOT_ANALYSIS.netRentableArea,
        area: 3000,
        distributionSummaryNoSquareFootage: 
        "The net rentable area and average square footage per unit was provided by the owner.",
        distributionSummaryYesSquareFootage: 
        "The net rentable area and square footage per unit was provided by the owner."
    },
    {
        name: "Net Leasable Area",
        basis: enums.BASIS_SQUARE_FOOT_ANALYSIS.netLeasableArea,
        area: 3000,
        distributionSummaryNoSquareFootage: 
        "The net leasable area and average square footage per unit was provided by the owner.",
        distributionSummaryYesSquareFootage: 
        "The net leasable area and square footage per unit was provided by the owner."
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("5918-19"),
    residentialUnits: rentRollResidentialUnitsFixture(),
    squareFootAnalysisFixture: _squareFootAnalysisFixture
};