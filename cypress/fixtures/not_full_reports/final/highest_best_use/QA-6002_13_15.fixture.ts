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

const asVacantDiscussionText = `The subject is located within a primarily ${checkValues.commercial.toLowerCase()}` +
" neighborhood. Based on our analysis of the market, there is sufficient demand for multi-family properties." + 
" Market conditions, though, are such that new multi-family construction is not feasible, as the value" + 
" would not sufficiently exceed the cost plus developer's profit. New construction in the neighborhood is" + 
` currently underway but limited, an indication that developing new ${checkValues.residential.toLowerCase()}` + 
" buildings is not feasible.";

const initialAsImprovedDiscussionText = "The subject property is located within a" + 
` primarily ${checkValues.commercial.toLowerCase()} neighborhood exhibiting low vacancy rates and increasing` +
" rental rates. Upon renovation, the subject will reflect 100% occupancy and will generate a positive net cash flow." + 
` Therefore, use as a ${checkValues.residential.toLowerCase()} property is financially feasible.` + 
" Also, demolition is not an option.";

const asImprovedDiscussionText = "The subject property is located within a" + 
` primarily ${checkValues.commercial.toLowerCase()} neighborhood exhibiting low vacancy rates and increasing` +
" rental rates. Upon renovation, the subject will reflect 100% occupancy and will generate a positive net cash flow." + 
" Therefore, use as a multi-family property is financially feasible." + 
" Also, demolition is not an option.";

export default {
    reportCreationData: ReportDataCreator.getReportData("6002_13", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    typeAs:  Enums.FEASIBLE_PROPERTY_TYPES.multiFamily,
    checkValues,
    commentNames,
    asVacantDiscussionText,
    asImprovedDiscussionText,
    initialAsImprovedDiscussionText
};