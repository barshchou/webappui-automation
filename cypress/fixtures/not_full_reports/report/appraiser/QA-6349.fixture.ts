import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = (): BoweryAutomation.ReportCreationData => {
    return {
        state: "Other",
        address: "128 West Philadelphia Street, York, Pennsylvania, USA",
        identifierType: "PIN",
        identifier: "20-36-420-020-0000",
        reportNumber: "TestAutoReport-4429",
        isSalesForcePull: false,
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.residential,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("6349"),
    otherReport: reportCreationFixture(),
    appraiserName: "Sherif Elshoubri",
    states: {
        newYork: Enums.ORGANIZATION_STATE.newYork,
        pennsylvania: Enums.ORGANIZATION_STATE.pennsylvania
    }
};