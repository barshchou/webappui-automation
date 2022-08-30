import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4778_2");

export default {
    reportCreationData: _reportCreationData,
    period:
        {
            expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.actualT12,
            year: Number(getYearFromDate()) - 1,
            month: "April",
            grossRevenue: 10000,
            realEstateTaxes: 7777.92,
            insurance: 4035,
            electricity: 500,
            fuel: 500,
            waterAndSewer: 1119,
            repairsAndMaintenance: 999,
            payrollAndBenefits: 112,
            generalAndAdministrative: 5000,
            legalAndProfessionalFees: 666,
            miscellaneous: 4000,
            management: 189.51,
            reserves: 155.85
        }
};