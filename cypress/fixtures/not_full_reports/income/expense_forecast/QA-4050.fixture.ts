import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4050", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const comparableFixture = () => {
    return {
        address: "6001 S Sacramento Ave", location: "Chicago", period: "Projection",
        squareFeet: 6608, resUnits: 13, insurance: 3900, electricity: 12675, repairsAndMaintenance: 5850,
        payrollAndBenefits: 3900, generalAndAdministrative: 2925, management: 4899, toe: "$34,149.00"
    };
};

const expenseForecastInsuranceFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "insurance", forecast: 50
    };
};

const commentariesFixture = () => {
    return {
        generated: "Operating expenses, exclusive of real estate taxes, were forecasted at $50.00 per square foot " +
            "and $0 per unit. Excluding real estate taxes, the comparables ranged from $5.17 to $5.17 per square " +
            "foot and $2,627 to $2,627 per unit. Our forecast is near the comparable range on both a per square foot " +
            "and per unit basis, as well as logically placed in relation to the historical performance of the asset. " +
            "Thus, this forecast is reasonable and will be applied in our valuation analysis.",
        edited: "some new adding to commentary"
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    comparable: Object.freeze(comparableFixture()),
    expenseForecastInsurance: expenseForecastInsuranceFixture(),
    commentaries: Object.freeze(commentariesFixture())
};