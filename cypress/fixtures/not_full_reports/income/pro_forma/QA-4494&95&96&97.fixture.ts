import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4494&95&96&97");
const _grossBuildingArea = 1700;
const _resUnits= 3;
const _listOfUnitsSF = [ 1500, 2000, 2300 ];
const _monthlyRent= [ 60, 500, 450 ];

const annualTotalRent = () => {
    let annualTotalRent = 0;
    for (let i = 0; i < _monthlyRent.length; i++){
        annualTotalRent += _monthlyRent[i] * 12;
    }
    return annualTotalRent;
};

const _totalPerSF = annualTotalRent() / _grossBuildingArea;
const _totalPerUnit = annualTotalRent() / _resUnits;

export default {
    reportCreationData: _reportCreationData,
    totalPerSF: _totalPerSF,
    totalPerUnit: _totalPerUnit,
    grossBuildingArea: _grossBuildingArea,
    listOfUnitsSF: _listOfUnitsSF,
    resUnits: _resUnits,
    monthlyRent: _monthlyRent,
    annualTotalRent: annualTotalRent()
};