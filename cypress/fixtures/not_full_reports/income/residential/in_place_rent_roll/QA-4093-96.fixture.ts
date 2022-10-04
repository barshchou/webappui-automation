import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _rentRollResidentialUnitsFixture: BoweryReports.ResidentialUnit[] = [
    {
        footage: 235,
        monthlyRent: 5758
    },
    {
        footage: 0,
        monthlyRent: 5758
    },
    {
        footage: 235,
        monthlyRent: 0
    },
    {
        footage: 0,
        monthlyRent: 0
    },
];

const _commentaryToBe = "462 1st Avenue currently contains 0 occupied unit " + 
    "generating $0 of total annual residential income.";

export default {
    reportCreationData: ReportDataCreator.getReportData("4093-96"),
    resUnit: 1,
    squareFootage: 235,
    monthlyRent: 5758,
    psfRadioValuePerMonthly: Enums.UNITS_OF_MEASURE.monthly,
    psfRadioValuePerAnnually: Enums.UNITS_OF_MEASURE.annually,
    columnName: "Rent PSF/Month",
    rentRollResidentialUnits: _rentRollResidentialUnitsFixture,
    commentaryToBe: _commentaryToBe
};