import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const convertTypeAsInCommentary = (typeAs: BoweryReports.FeasiblePropertyType) => {
    if (typeAs === "multiFamily") {
        return Cypress._.kebabCase(typeAs);
    } else {
        return Cypress._.startCase(typeAs).toLowerCase();
    }
};

const typeAs = Enums.FEASIBLE_PROPERTY_TYPES.multiFamily;

const checkValues = {
    residential: "Residential",
    commercial: "Commercial"
};

const commentNames = {
    financiallyFeasibleAsImproved: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.financiallyFeasibleAsImproved,
    financiallyFeasibleAsVacant: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.financiallyFeasibleAsVacant,
    maximallyProductiveAsVacant:  Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.maximallyProductiveAsVacant,
    conclusionAsVacant: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.conclusionAsVacant,
    maximallyProductiveAsImproved: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.maximallyProductiveAsImproved,
    conclusionAsImproved: Enums.HIGHEST_AND_BEST_USE_COMMENTS_ENUM.conclusionAsImproved
};

const asVacantDiscussionText = `The subject is located within a primarily ${checkValues.commercial.toLowerCase()}` +
" neighborhood. Based on our analysis of the market, there is sufficient demand for" + 
` ${convertTypeAsInCommentary(typeAs)} properties. Market conditions, though, are such that new` + 
` ${convertTypeAsInCommentary(typeAs)} construction is not` +
" feasible, as the value would not sufficiently exceed the cost plus developer's profit. New construction" + 
" in the neighborhood is currently underway but limited, an indication that developing" + 
` new ${checkValues.residential.toLowerCase()} buildings is not feasible.`;

const initialAsImprovedDiscussionText = "The subject property is located within a" + 
` primarily ${checkValues.commercial.toLowerCase()} neighborhood exhibiting low vacancy rates and increasing` +
" rental rates. Upon renovation, the subject will reflect 100% occupancy and will generate a positive net cash flow." + 
` Therefore, use as a ${checkValues.residential.toLowerCase()} property is financially feasible.` + 
" Also, demolition is not an option.";

const asImprovedDiscussionText = "The subject property is located within a" + 
` primarily ${checkValues.commercial.toLowerCase()} neighborhood exhibiting low vacancy rates and increasing` +
" rental rates. Upon renovation, the subject will reflect 100% occupancy and will generate a positive net cash flow." + 
` Therefore, use as a ${convertTypeAsInCommentary(typeAs)} property is financially feasible.` + 
" Also, demolition is not an option.";

const initialAsVacantMaximallyProductiveDiscussionText = "There does not appear to be any reasonably probable use of" + 
" the site that would generate a higher residual land value than to hold" + 
` for development of ${checkValues.residential.toLowerCase()} use. Based on the normal market density` + 
" level permitted by zoning, this is considered the maximally productive use of the site.";

const asVacantMaximallyProductiveDiscussionText = "There does not appear to be any reasonably probable use of the" +
" site that would generate a higher residual land value than to hold" + 
` for development of ${convertTypeAsInCommentary(typeAs)} use. Based on the normal market density` + 
" level permitted by zoning, this is considered the maximally productive use of the site.";

const asVacantConclusionDiscussionText = "Based on the subject property's zoning, physical" + 
" characteristics, location, and forecasted economic conditions, it is our opinion that the highest and best" + 
` use of the site as vacant is to hold for development of a ${convertTypeAsInCommentary(typeAs)}` + 
" building to the highest density permitted by zoning and supported within the market.";

const asImprovedMaximallyProductiveDiscussionText = "There does not appear to be any alternative use that could" + 
" reasonably be expected to provide a higher present value than the current use, and the existing use exceeds the" + 
` value of the site as vacant. Continued ${convertTypeAsInCommentary(typeAs)} use upon` + 
" completion of the proposed construction and renovations is concluded to be maximally productive.";

const asImprovedConclusionDiscussionText = "Based on the subject property's zoning, physical characteristics," + 
` location, and forecasted economic conditions, continued ${convertTypeAsInCommentary(typeAs)} use is` + 
" concluded to be the highest and best use as improved.";



export default {
    reportCreationData: ReportDataCreator.getReportData("6002_13_15_20-21", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    }),
    typeAs,
    checkValues,
    commentNames,
    asVacantDiscussionText,
    asImprovedDiscussionText,
    initialAsImprovedDiscussionText,
    initialAsVacantMaximallyProductiveDiscussionText,
    asVacantMaximallyProductiveDiscussionText,
    asVacantConclusionDiscussionText,
    asImprovedMaximallyProductiveDiscussionText,
    asImprovedConclusionDiscussionText
};