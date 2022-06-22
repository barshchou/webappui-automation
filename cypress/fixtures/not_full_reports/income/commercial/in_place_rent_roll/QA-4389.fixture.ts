import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4389", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    });
};

const generalFixture = () => {
    return {
        squareFeet: 190.5,
        rentPerSF: 100,
        annualRent: 20000.156,
        monthlyRent: 550.5
    };
};

export default {
    unitsOfMeasureAnnually: "annually" as BoweryReports.UnitsOfMeasure,
    unitsOfMeasureMonthly: "monthly" as BoweryReports.UnitsOfMeasure,
    reportCreationData: reportCreationFixture(),
    general: Object.freeze(generalFixture())
};