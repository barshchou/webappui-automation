import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const checkValues = {
    residential: "Residential",
    commercial: "Commercial"
};

const commentNames = {
    financiallyFeasibleAsImproved: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.financiallyFeasibleAsImproved,
    financiallyFeasibleAsVacant: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.financiallyFeasibleAsVacant,
    maximallyProductiveAsVacant:  Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.maximallyProductiveAsVacant,
    conclusionAsVacant: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.conclusionAsVacant
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

const initialAsVacantMaximallyProductiveDiscussionText = "There does not appear to be any reasonably probable use of" + 
" the site that would generate a higher residual land value than to hold" + 
` for development of ${checkValues.residential.toLowerCase()} use. Based on the normal market density` + 
" level permitted by zoning, this is considered the maximally productive use of the site.";

const asVacantMaximallyProductiveDiscussionText = "There does not appear to be any reasonably probable use of the" +
" site that would generate a higher residual land value than to hold" + 
" for development of multi-family use. Based on the normal market density" + 
" level permitted by zoning, this is considered the maximally productive use of the site.";

const asVacantConclusionDiscussionText = "Based on the subject property's zoning, physical" + 
" characteristics, location, and forecasted economic conditions, it is our opinion that the highest and best" + 
" use of the site as vacant is to hold for development of a multi-family building to the highest density permitted" + 
" by zoning and supported within the market.";


export default {
    reportCreationData: ReportDataCreator.getReportData("6002_13_15_20", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    typeAs:  Enums.FEASIBLE_PROPERTY_TYPES.multiFamily,
    checkValues,
    commentNames,
    asVacantDiscussionText,
    asImprovedDiscussionText,
    initialAsImprovedDiscussionText,
    initialAsVacantMaximallyProductiveDiscussionText,
    asVacantMaximallyProductiveDiscussionText,
    asVacantConclusionDiscussionText
};