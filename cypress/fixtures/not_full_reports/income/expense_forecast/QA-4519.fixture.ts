import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getCurrentMonthName, getYearFromDate } from "../../../../../utils/date.utils";

const _basis = "sf" as BoweryReports.UnitSF;

const _actualInsuranceItem: BoweryReports.ForecastItem =  {
  name: "insurance",
  basis: _basis,
  projection: 10000
}; 

const _t12InsuranceItem: BoweryReports.ForecastItem = {
  name: "insurance",
  basis: _basis,
  projection: 13000
};

const _historicalInsuranceItem: BoweryReports.ForecastItem = {
  name: "insurance",
  basis: _basis,
  projection: 15000
};

const _ownerProjectionInsuranceItem: BoweryReports.ForecastItem = {
  name: "insurance",
  basis: _basis,
  projection: 17000
};

const _buildingDescription: BoweryReports.BuildingDescription = {
  grossArea: 2500,
  numberOfUnits: 5,
};

export default {
  reportCreationData: ReportDataCreator.getReportData("4519"),
  actualInsuranceItem: _actualInsuranceItem,
  t12InsuranceItem: _t12InsuranceItem,
  historicalInsuranceItem: _historicalInsuranceItem,
  ownerProjectionInsuranceItem: _ownerProjectionInsuranceItem,
  buildingDescription: _buildingDescription,
  periods: [
    {
      expensePeriodType: "Actual",
      year: Number(getYearFromDate()) - 1,
      insurance: 10000,
    },
    {
      expensePeriodType: "Projection",
      year: Number(getYearFromDate()) + 1,
      insurance: 17000,
    },
  ],
  periodsMonth: [
    {
      expensePeriodType: "Actual T12",
      month:getCurrentMonthName(),
      year: getYearFromDate(),
      insurance: 13000,
    },
    {
      expensePeriodType: "Annualized Historical",
      month: getCurrentMonthName(),
      year: getYearFromDate(),
      insurance: 15000,
    },
  ],

  insurancePerSfCardSnapshotName: "Insurance_PerSF_Forecast_Item_Component",
  basis: _basis
};