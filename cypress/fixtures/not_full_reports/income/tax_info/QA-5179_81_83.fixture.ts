import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";

const reportCreationFixture = (): BoweryAutomation.ReportCreationData => {
    return {
        state: "Other",
        address: "8524 South Oglesby Avenue",
        identifierType: "PIN",
        identifier: "20-36-420-020-0000",
        reportNumber: "TestAutoReport-5179_81_83",
        isSalesForcePull: false,
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.residential,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

const _verifyExportValues = [
    "Special Assessment Row",
    "Tax Rate",
    "Additional Tax Rate",
    "Tax Liability"
];

export default {
    reportCreationData: reportCreationFixture(),
    title: "Tax Calculation Discussion",
    verifyExportValues: _verifyExportValues,
    checkValue: Enums.PER_UNIT_PER_SF.perUnit
};