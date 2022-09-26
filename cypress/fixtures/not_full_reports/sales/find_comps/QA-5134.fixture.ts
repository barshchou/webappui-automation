import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { Filter } from "mongodb";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

const filter: Filter<object> = { $or: [ { [compProperty]:compStatusDate } ] };

export default {
    reportCreationData: ReportDataCreator.getReportData("5134", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    /**
     * Number of sales comps which will be added for test
     */
    compsToAdd: [ 0, 1 ],
    /**
     * alias for sales comps check
     */
    aliasCompsBefore:"comps_before",
    aliasCompsAfter:"comps_after",
    filter
};