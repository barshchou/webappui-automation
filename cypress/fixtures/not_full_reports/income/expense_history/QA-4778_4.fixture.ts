import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4778_4");

export default {
    reportCreationData: _reportCreationData,
    period:
        {
            expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.projection,
            year: Number(getYearFromDate()) + 1,
            grossRevenue: 100000,
            realEstateTaxes: 7777.92,
            insurance: 4035,
            electricity: 50000,
            fuel: 1,
            waterAndSewer: 11.35,
            repairsAndMaintenance: 55.96,
            payrollAndBenefits: 112,
            generalAndAdministrative: 5000,
            legalAndProfessionalFees: 666,
            miscellaneous: 4000,
            management: 189.51,
            reserves: 155.85
        }
};