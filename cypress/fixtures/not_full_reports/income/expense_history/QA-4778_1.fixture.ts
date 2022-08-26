import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4778_1");

export default {
    reportCreationData: _reportCreationData,
    period:
        {
            expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actual,
            year: Number(getYearFromDate()) - 1,
            grossRevenue: 60000,
            realEstateTaxes: 10000,
            insurance: 1000,
            electricity: 7000,
            fuel: 500,
            waterAndSewer: 1119,
            repairsAndMaintenance: 999,
            payrollAndBenefits: 112,
            generalAndAdministrative: 5000,
            legalAndProfessionalFees: 666,
            miscellaneous: 4000,
            management: 3333,
            reserves: 155.85
        }
};