import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import mapKeysUtils from "../../../../utils/mapKeys.utils";

const aliasCompsBefore = "aliasCompsBefore";

/**
 * Filename where test data during the report test case will be written,
 * so we read this data in export check test case
 */
const memoTestDataFile = `${mapKeysUtils.salesCompsAddresses}.txt`;

export default {
    reportCreationData: ReportDataCreator.getReportData("5136", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    /**
     * Number of sales comps which will be added for test
     */
    compsToAdd: [ 0, 1 ],
    aliasCompsBefore,
    memoTestDataFile
};