import Enums from "../../../../enums/enums";
import reportDataCreator from "../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return reportDataCreator.setAddress()
        .setReportNumber("1764459100", true)
        .setTemplateValue(Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC)
        .setIncomeValue(Enums.INCOME_TYPE.BOTH)
        .setConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE).build();
};

const _date = [
    {
        type: "dueDate",
        date: null
    },
    {
        type: "dueDate",
        date: "05-18-2022"
    }
];

export default {
    reportCreationData: reportCreationFixture(),
    date: _date,
    verifyValue: "03-16-2021",
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    ] as Array <BoweryReports.ConclusionValue>
};