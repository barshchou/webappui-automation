import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("5121");

const proFormaTypes = Enums.PRO_FORMA_TYPES;

export default {
    reportCreationData: _reportCreationData,
    customCategory: "Custom",
    expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
    expenseYear: Number(getYearFromDate()) - 1,
    grossRevenue: 5000,
    expensesToCheck: [ proFormaTypes.realEstateTaxes, proFormaTypes.insurance, proFormaTypes.electricity,
        proFormaTypes.fuel, proFormaTypes.waterAndSewer, proFormaTypes.repairAndMaintenance,
        proFormaTypes.payrollBenefits, proFormaTypes.generalAndAdministrative, proFormaTypes.legalAndProfessional,
        proFormaTypes.miscellaneous, proFormaTypes.managementFees, proFormaTypes.replacementsAndReserves, "Custom" ],
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.incomeCapitalizationApproach ]
};