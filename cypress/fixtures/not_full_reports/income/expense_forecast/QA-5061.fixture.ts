import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5061");
};

const residentialUnits = 3;
const grossBuildingArea = 3000;
const customCategoryName = "Heating";

const _customCategory: BoweryReports.ForecastItem = {
    name: customCategoryName,
    basis: Enums.UNIT_SF.unit,
    forecast: 4
};

const expenses = [
    Enums.EXPENSES_CARD_NAMES.electricity,
    Enums.EXPENSES_CARD_NAMES.insurance,
    Enums.EXPENSES_CARD_NAMES.electricity,
    Enums.EXPENSES_CARD_NAMES.fuel,
    Enums.EXPENSES_CARD_NAMES.waterAndSewer,
    Enums.EXPENSES_CARD_NAMES.repairAndMaintenance,
    Enums.EXPENSES_CARD_NAMES.payrollBenefits,
    Enums.EXPENSES_CARD_NAMES.generalAndAdministrative,
    Enums.EXPENSES_CARD_NAMES.legalAndProfessional,
    Enums.EXPENSES_CARD_NAMES.miscellaneous,
    Enums.EXPENSES_CARD_NAMES.managementFees,
    Enums.EXPENSES_CARD_NAMES.replacementsAndReserves
];

export default {
    reportCreationData: reportCreationFixture(),
    customCategory: _customCategory,
    residentialUnits,
    grossBuildingArea,
    customCategoryName,
    expenses
};