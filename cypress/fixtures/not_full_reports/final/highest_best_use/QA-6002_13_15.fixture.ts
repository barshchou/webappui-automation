import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const checkValues = {
    residential: "Residential",
    commercial: "Commercial"
};

const commentNames = {
    improved: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.financiallyFeasibleAsImproved,
    vacant: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.financiallyFeasibleAsVacant
};

export default {
    reportCreationData: ReportDataCreator.getReportData("6002_13", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    typeAs:  Enums.FEASIBLE_PROPERTY_TYPES.multiFamily,
    checkValues,
    commentNames
};