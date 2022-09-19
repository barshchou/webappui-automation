import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _compsFixture = [
    {
        adjustments: { 
            propertyRights: -50,
            financingTerms: -60,
            conditionsOfSale: -70,
            marketConditions: -30
        },
        propertyRightsDiscussionText: "The purpose of this adjustment is to account for differences in the " + 
        "property rights transferred with the sale. Comparable 1 has superior property rights, and thus " + 
        "required a downward adjustment.",
        financingTermsDiscussion: "The purpose of adjusting for financing terms is to determine cash equivalent " + 
        "sale prices for the comparables in accordance with the definition of market value for this report. " + 
        "Comparable 1 has superior financing terms, and thus required a downward adjustment.",
        conditionsOfSaleDiscussion: "Condition of sale refers to the motivations of the buyer and seller involved " + 
        "in a particular transaction. Comparable 1 required a downward adjustment.",
        marketConditionTimeDiscussion: "The purpose of this adjustment is to account for changes in market " + 
        "conditions. Comparable 1 received a minor adjustment to account for moderate market depreciation."
    },
    {
        adjustments: {
            propertyRights: 70,
            financingTerms: 20,
            conditionsOfSale: 5,
            marketConditions: 50
        },
        propertyRightsDiscussionText: "The purpose of this adjustment is to account for differences in the property " + 
        "rights transferred with the sale. Comparable 1 has inferior property rights, and thus " + 
        "required an upward adjustment.",
        financingTermsDiscussion: "The purpose of adjusting for financing terms is to determine cash equivalent " + 
        "sale prices for the comparables in accordance with the definition of market value for this report. " + 
        "Comparable 1 has inferior financing terms, and thus required an upward adjustment.",
        conditionsOfSaleDiscussion: "Condition of sale refers to the motivations of the buyer and seller involved " + 
        "in a particular transaction. Comparable 1 required an upward adjustment.",
        marketConditionTimeDiscussion: "The purpose of this adjustment is to account for changes in market " + 
        "conditions. Comparable 1 received a minor adjustment to account for moderate market appreciation."
    },
    {
        adjustments: {
            propertyRights: 0,
            financingTerms: 0,
            conditionsOfSale: 0,
            marketConditions: 0
        },
        propertyRightsDiscussionText: "The purpose of this adjustment is to account for differences in the property " + 
        "rights transferred with the sale. We are valuing the leased fee interest in the subject property, " + 
        "as reflected by all of the comparables. Thus, no adjustments were required.",
        financingTermsDiscussion: "The purpose of adjusting for financing terms is to determine cash " + 
        "equivalent sale prices for the comparables in accordance with the definition of market value for " + 
        "this report. To the best of our knowledge, all of the comparables used in this analysis were accomplished " + 
        "with cash or market-oriented financing. Therefore, no adjustments were required.",
        conditionsOfSaleDiscussion: `Condition of sale refers to the motivations of the buyer and seller involved ` + 
        `in a particular transaction. However, all comparables used in this analysis are considered to be ` + 
        `"arm’s-length" market transactions between both knowledgeable buyers and sellers on the open market. ` + 
        `Therefore, no adjustments were required.`,
        marketConditionTimeDiscussion: "The purpose of this adjustment is to account for changes in market " + 
        "conditions. All comparables used in this analysis sold at a similar time; " + 
        "therefore, no adjustments were required."
    }
];

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

export default {
    reportCreationData: ReportDataCreator.getReportData("4222", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.marketAdjustment,
    compProperty,
    compStatusDate,
    calculationUnits: Enums.CALCULATION_UNITS.perResidentialUnits,
    comparablesAdjustments: _compsFixture,
    discussionSection: Enums.ADJUST_COMPS_DISCUSSION_SECTIONS.market,
    propertyRightsDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.propertyRightsDiscussion,
    financingTermsDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.financingTermsDiscussion,
    conditionOfSaleDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.conditionsOfSaleDiscussion,
    marketConditionDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.marketConditionsDiscussion
};