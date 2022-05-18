import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

// const reportCreationFixture = conclusionValue => {
//     return ReportDataCreator.setAddress()
//         .setReportNumber("1764459100", true)
//         .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
//         .setIncomeValue(Enums.INCOME_TYPE.BOTH)
//         .setConclusionValue(conclusionValue).build();
// };

export default {
    // reportCreationData: reportCreationFixture(),
    dateType: "dueDate",
    verifyValue: "03-16-2021",
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    ] as Array <BoweryReports.ConclusionValue>
};