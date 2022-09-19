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
        "required a downward adjustment."
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
        "required an upward adjustment."
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
            "as reflected by all of the comparables. Thus, no adjustments were required."
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
    discussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.propertyRightsDiscussion
};