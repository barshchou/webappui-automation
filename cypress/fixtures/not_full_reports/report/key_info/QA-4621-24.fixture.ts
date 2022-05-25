import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const firstReportCreationFixture = () => {
    return ReportDataCreator.setAddress()
        .setReportNumber("2200016363", true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

const secondReportCreationFixture = () => {
    return ReportDataCreator.setAddress()
        .setReportNumber("2200018586", true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

const thirdReportCreationFixture = () => {
    return ReportDataCreator.setAddress()
        .setReportNumber("1764459100", true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

const fourthReportCreationFixture = () => {
    return ReportDataCreator.setAddress()
        .setReportNumber("1764459005", true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    firstReportCreationData: firstReportCreationFixture(),
    secondReportCreationData: secondReportCreationFixture(),
    thirdReportCreationData: thirdReportCreationFixture(),
    fourthReportCreationData: fourthReportCreationFixture(),
    verifyValue: "EngagementLetter984234_SIGNED.pdf"
};