import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { getYearFromDate } from "../../../../../utils/date.utils";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4778_3");

export default {
    reportCreationData: _reportCreationData,
    period:
        {
            expensePeriodType: Enums.EXPENSE_PERIOD_TYPE.annualizedHistorical,
            year: Number(getYearFromDate()) - 1,
            month: "November",
            grossRevenue: 48000,
            realEstateTaxes: 7777.92,
            insurance: 4035,
            electricity: 500,
            fuel: 6987,
            waterAndSewer: 11.35,
            repairsAndMaintenance: 5897,
            payrollAndBenefits: 112,
            generalAndAdministrative: 5000,
            legalAndProfessionalFees: 666,
            miscellaneous: 0.56,
            management: 189.51,
            reserves: 155.85
        }
};