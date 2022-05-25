import Enums from "../../../../enums/enums";
import reportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationData = conclusionValue => {
    return reportDataCreator.getReportData("1764459100",
    {
        templateValue: Enums.TEMPLATE_TYPE.NOT_FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: conclusionValue
    }, true);
};

export default {
    dateType: "dueDate",
    verifyValue: "03-16-2021",
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    ] as Array<BoweryReports.ConclusionValue>
};