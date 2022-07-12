import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4182-83_4388", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const generalFixture = () => {
    return {
        squareFeet: 81,
        rentPerSF: 99,
        annualRent: 20000.156,
        monthlyRent: 550.5
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture()),
    unitsOfMeasureAnnually: "annually" as BoweryReports.UnitsOfMeasure,
    unitsOfMeasureMonthly: "monthly" as BoweryReports.UnitsOfMeasure
};