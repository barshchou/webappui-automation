import Enums from "../../../../../enums/enums";
import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";

const reportCreationFixture = (): BoweryAutomation.ReportCreationData => {
    return {
        state: "Other",
        address: "2454 Lafayette Road | Portsmouth, NH 03801",
        identifierType: "PIN",
        identifier: "PRSM-000273-000003-000010",
        reportNumber: "2100011795",
        isSalesForcePull: true,
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.residential,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

export default {
    reportCreationData: reportCreationFixture(),
    buildingName: "Portsmouth, NH",
    yearBuilt: "2017",
    gba: "138,226"
};