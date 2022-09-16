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

const dataFixture = [
    {
        specName: "[QA-6349]",
        state: Enums.ORGANIZATION_STATE.newYork,
        appraiserName: "Sherif Elshoubri"
    },
    {
        specName: "[QA-6350]",
        state: "None",
        appraiserName: "Jonathan Nathanson"
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("6349-50"),
    otherReport: reportCreationFixture(),
    appraiserName: "Sherif Elshoubri",
    pennsylvania: Enums.ORGANIZATION_STATE.pennsylvania,
    dataFixture
};