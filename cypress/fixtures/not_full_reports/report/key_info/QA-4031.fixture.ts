import Enums from "../../../../enums/enums";
import reportDataCreator from "../../../data_creator/reportData.creator";

export const reportCreationData = (jobNumber: string) => {
    return reportDataCreator.getReportData(jobNumber,
        {
            templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
            incomeValue: Enums.INCOME_TYPE.both,
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