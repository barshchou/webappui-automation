import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.setAddress()
        .setReportNumber("4104")
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

export default {
    reportCreationData: reportCreationFixture(),
    namesInputByQA: ["dateOfValuation", "inspectionDate"] as Array<string>,
    verifyDate: "03-02-2021",
    verifyText: "The most probable price which a property should bring in a competitive and open market under all conditions requisite to a fair sale, the buyer and seller each acting prudently, knowledgeably and assuming the price is not affected by undue stimulus. Implicit in this definition is the consummation of a sale as of a specified date and the passing of title from seller to buyer under conditions whereby:",
    tooltipText: "The following text will appear in the Definition of Market Value in your export; the numbered list of definitions below this paragraph is not able to be edited here"
};