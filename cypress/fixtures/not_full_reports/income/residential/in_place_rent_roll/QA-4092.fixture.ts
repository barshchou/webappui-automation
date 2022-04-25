import ReportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4092"),
    resUnit: 1,
    cases: [
        {
            squareFootage: 235,
            monthlyRent: 5758
        },
        {
            squareFootage: 0,
            monthlyRent: 5758
        },
        {
            squareFootage: '',
            monthlyRent: 5758
        },
        {
            squareFootage: 235,
            monthlyRent: 0
        },
        {
            squareFootage: 235,
            monthlyRent: ''
        },
        {
            squareFootage: 0,
            monthlyRent: 0
        },
        {
            squareFootage: '',
            monthlyRent: ''
        }
    ]
};