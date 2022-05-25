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
    verifyDate: "07-07-2020",
    jobNumbersAndValues: [
        {
            jobNumber: "1764459005",
            yield: "03-05-2021"
        },
        {
            jobNumber: "2200016363",
            yield: ""
        },
    ],
};