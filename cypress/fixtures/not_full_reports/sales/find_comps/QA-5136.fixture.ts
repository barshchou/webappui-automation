import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const aliasCompsBefore = "aliasCompsBefore";

export default {
    reportCreationData: ReportDataCreator.getReportData("5136", {
            incomeValue: Enums.INCOME_TYPE.both,
            conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
        }),
    /**
     * Number of sales comps which will be added for test
     */
    compsToAdd: [ 0, 1 ],
    aliasCompsBefore
};