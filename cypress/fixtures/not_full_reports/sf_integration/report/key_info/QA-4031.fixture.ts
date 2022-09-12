import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export const reportCreationData = (jobNumber: string) => {
    return reportDataCreator.getReportData(jobNumber,
        {
            templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
            incomeValue: Enums.INCOME_TYPE.both,
        }, true);
};

const _dueDateFixture: BoweryReports.KeyInfoDateType = {
    type: Enums.DATE_TYPE.dueDate,
    date: "07-07-2020"
};

export default {
    dueDateFixture: _dueDateFixture,
    jobNumbersAndValues: [
        {
            jobNumber: "1764459005",
            yield: "03-05-2021"
        },
        {
            jobNumber: "2200017578",
            yield: ""
        },
    ],
};