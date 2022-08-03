import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import { getYearFromDate } from "../../../../../utils/date.utils";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4778");

export default {
    reportCreationData: _reportCreationData,
    periods: [
        {
            expensePeriodType: "Actual",
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
        },
        {
            expensePeriodType: "Actual T12",
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
        },
        {
            expensePeriodType: "Annualized Historical",
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
        },
        {
            expensePeriodType: "Projection",
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
    ]
};
