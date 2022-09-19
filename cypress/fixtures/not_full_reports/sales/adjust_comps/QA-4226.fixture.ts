import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const city = "New York";
const state = Enums.ORGANIZATION_STATE.newYork;
const neighborhood = "Albany";
const area = "Bronx County";
const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const compNeighborhood = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.neighborhood;
const compNeighborhoodValues = Enums.COMP_PROPERTIES_PATHS_DB.neighborhoodValues.williamsburg;
const positiveAdjustmentNeighborhood = 50;
const positiveAdjustmentLocation = 60;
const negativeAdjustmentNeighborhood = -70;
const negativeAdjustmentLocation = -80;

const _compsFixture = [
    {
        adjustments: { 
            neighborhoodAdjustment: negativeAdjustmentNeighborhood,
            locationInNeighborhoodAdjustment: negativeAdjustmentLocation
        },
        locationDiscussionDiscussionText: "The subject property is located in the " + neighborhood + 
        " neighborhood of " + city + ", " + state + ".\n" +
        "Comparable 1 is located in a superior area within " + neighborhood + ", and thus required " + 
        "a "+ Math.abs(negativeAdjustmentLocation) + "% downward adjustment.\n" + 
        "Comparable 1 is located in " + compNeighborhoodValues + ", which is a superior neighborhood, " + 
        "and thus required a " + Math.abs(negativeAdjustmentNeighborhood) + "% downward adjustment."
    },
    {
        adjustments: {
            neighborhoodAdjustment: positiveAdjustmentNeighborhood,
            locationInNeighborhoodAdjustment: positiveAdjustmentLocation
        },
        locationDiscussionDiscussionText: "The subject property is located in the " + neighborhood + 
        " neighborhood of " + city + ", " + state + ".\n" +
        "Comparable 1 is located in an inferior area within " + neighborhood + " and thus required a " + 
        positiveAdjustmentLocation + "% upward adjustment.\n" + 
        "Comparable 1 is located in " + compNeighborhoodValues + ", which is an inferior neighborhood, and thus " + 
        "required a " + positiveAdjustmentNeighborhood + "% upward adjustment."
    },
    {
        adjustments: {
            neighborhoodAdjustment: 0,
            locationInNeighborhoodAdjustment: 0
        },
        locationDiscussionDiscussionText: "The subject property is located in the " + neighborhood + 
        " neighborhood of " + city + ", " + state +". All comparables used in this analysis are in similar " + 
        "locations compared to the subject property. Therefore, no adjustments were required."
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4226", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.locationAdjustment,
    compProperty,
    compStatusDate,
    compNeighborhood,
    compNeighborhoodValues,
    calculationUnits: Enums.CALCULATION_UNITS.perResidentialUnits,
    comparablesAdjustments: _compsFixture,
    discussionSection: Enums.ADJUST_COMPS_DISCUSSION_SECTIONS.location,
    locationDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.locationDiscussion,
    neighborhood,
    area
};