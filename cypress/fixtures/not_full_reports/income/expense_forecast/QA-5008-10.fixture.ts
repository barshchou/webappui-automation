import ReportDataCreator from "../../../data_creator/reportData.creator";
import { BoweryReports } from "../../../../types/boweryReports.type";
import expensesForecastCardNamesEnum from "../../../../enums/expense/expensesForecastCardNames.enum";


const _customCategory: BoweryReports.ForecastItem = {
    name: "customExpence"
};

const _expensesForecastCardNamesArray = [
    expensesForecastCardNamesEnum.insurance,
    expensesForecastCardNamesEnum.electricity,
    expensesForecastCardNamesEnum.fuel,
    expensesForecastCardNamesEnum.waterAndSewer,
    expensesForecastCardNamesEnum.repairAndMaintenance,
    expensesForecastCardNamesEnum.payrollBenefits,
    expensesForecastCardNamesEnum.generalAndAdministrative,
    expensesForecastCardNamesEnum.legalAndProfessional,
    expensesForecastCardNamesEnum.miscellaneous,
    expensesForecastCardNamesEnum.managementFees,
    expensesForecastCardNamesEnum.replacementsAndReserves,
];

export default {
    reportCreationData: ReportDataCreator.getReportData("5008-10"),
    customCategory: _customCategory,
    expensesForecastCardNamesArray: _expensesForecastCardNamesArray
};