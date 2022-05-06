import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _rentRollResidentialUnitsFixture: BoweryReports.ResidentialRentRollUnit[] = [
        {
            squareFootage: 235,
            monthlyRent: 5758
        },
        {
            squareFootage: 0,
            monthlyRent: 5758
        },
        {
            squareFootage: 235,
            monthlyRent: 0
        },
        {
            squareFootage: 0,
            monthlyRent: 0
        },
    ];

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4094"),
    resUnit: 1,
    squareFootage: 235,
    monthlyRent: 5758,
    psfRadioValue: 'monthly',
    rentRollResidentialUnits: _rentRollResidentialUnitsFixture
};