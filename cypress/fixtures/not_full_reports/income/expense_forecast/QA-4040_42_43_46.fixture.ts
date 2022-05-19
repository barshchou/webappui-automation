import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4040_42_43_46");
};

const expenseForecastWaterAndSewerFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "waterAndSewer",
        basis: "sf",
        forecast: 2
    };
};

const expenseForecastReplacmentReserveFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "reserves",
        basis: "sf",
        forecast: 2
    };
};

const expenseForecastInsuranceFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "insurance",
        basis: "sf",
        forecast: 4
    };
};

const expenseForecastPayrollAndBenefitsFixture = (): BoweryReports.ForecastItem => {
    return {
        name: "payrollAndBenefits",
        basis: "sf",
        forecast: 4
    };
};

const waterAndSewerCommentariesFixture = () => {
    return {
        generatedPerSF: "Based on the information above, we have projected this expense at $2.00 per square foot, or $4,248,882 annually.",
        generatedPerUnit: "Based on the information above, we have projected this expense at $2 per unit, or $10 annually.",
    };
};

const replacementReserveCommentariesFixture = () => {
    return {
        generatedPerSF: "This expense provides for the periodic replacement of building components that wear out more rapidly than the "+
                        "building itself and that must be replaced periodically during the building's economic life. We note the owner did not indicate "+
                        "this expense. We have projected this expense at $2.00 per square foot, or $4,248,882 annually.",
        generatedPerUnit: "This expense provides for the periodic replacement of building components that wear out more rapidly than the " +
                        "building itself and that must be replaced periodically during the building's economic life. We note the owner did not indicate this " +
                        "expense. We have projected this expense at $2 per unit, or $10 annually.",
    };
};

const insuranceCommentariesFixture = () => {
    return {
        generatedPerSF: "Insurance costs vary by the type of coverage. Costs are generally lower (on a per square foot basis) "+
                        "for larger buildings and for multi-building policies. Based on the information above, we have projected "+
                        "this expense at $4.00 per square foot, or $8,497,764 annually.",
        generatedPerUnit: "Insurance costs vary by the type of coverage. Costs are generally lower (on a per unit basis) for larger "+
                        "buildings and for multi-building policies. Based on the information above, we have projected this expense at "+
                        "$4 per unit, or $20 annually.",
    };
};

const payrollAndBenefitsCommentariesFixture = () => {
    return {
        generatedPerSF: "Payroll costs will cover building staff whose duties will include trash removal, common area cleaning and general maintenance. "+
                        "Payroll taxes and fringes cover state and federal taxes as well as benefits that building employees receive. "+
                        "Based on the information above, we have projected this expense at $4.00 per square foot, or $8,497,764 annually.",
        generatedPerUnit: "Payroll costs will cover building staff whose duties will include trash removal, common area cleaning and general maintenance. "+
                        "Payroll taxes and fringes cover state and federal taxes as well as benefits that building employees receive. "+
                        "Based on the information above, we have projected this expense at $4 per unit, or $20 annually.",
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    expenseForecastWaterAndSewer: expenseForecastWaterAndSewerFixture(),
    expenseForecastReplacementReserve: expenseForecastReplacmentReserveFixture(),
    expenseForecastInsurance: expenseForecastInsuranceFixture(),
    expenseForecastPayrollAndBenefits: expenseForecastPayrollAndBenefitsFixture(),
    commentariesWaterAndSewer: Object.freeze(waterAndSewerCommentariesFixture()),
    commentariesReplacementReserve: Object.freeze(replacementReserveCommentariesFixture()),
    commentariesInsurance: Object.freeze(insuranceCommentariesFixture()),
    commentariesPayrollAndBenefits: Object.freeze(payrollAndBenefitsCommentariesFixture()),
    residentialUnits: 5,
    editedCommentary: "some new adding to commentary"
};