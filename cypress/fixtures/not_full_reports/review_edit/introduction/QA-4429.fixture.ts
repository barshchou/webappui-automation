import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

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

const reportsData = [
    {
        reportFixture: ReportDataCreator.getReportData("4429"),
        state: "NYC"
    },
    {
        reportFixture: reportCreationFixture(),
        state: "Other"
    },
];

export default {
    reportsData,
    typeValue: "Test values",
    title:  "Data Sources",
    backLinkNames: Enums.PAGES_TEXTBOX_NAMES.dataSourcesDescriptionExport
};