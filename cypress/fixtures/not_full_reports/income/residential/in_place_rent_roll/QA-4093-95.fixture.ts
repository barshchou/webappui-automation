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

export default {
    reportCreationData: ReportDataCreator.getReportData("4093-95"),
    resUnit: 1,
    squareFootage: 235,
    monthlyRent: 5758,
    psfRadioValuePerMonthly: 'monthly' as BoweryReports.UnitsOfMeasure,
    psfRadioValuePerAnnually: 'annually' as BoweryReports.UnitsOfMeasure,
    columnName: "Rent PSF/Month",
    rentRollResidentialUnits: _rentRollResidentialUnitsFixture
};