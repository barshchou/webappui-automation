import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;
const positiveAdjustmentNeighborhood = 50;
const positiveAdjustmentLocation = 60;
const negativeAdjustmentNeighborhood = -70;
const negativeAdjustmentLocation = -80;

const kitchenCondition = "Good";
const bathroomCondition = "Good";
const bedroomCondition = "Good";
const livingRoomCondition = "Good";

const _compsFixture = [
    {
        adjustments: { 
            neighborhoodAdjustment: negativeAdjustmentNeighborhood,
            locationInNeighborhoodAdjustment: negativeAdjustmentLocation
        },
        locationDiscussionDiscussionText: ""
    },
    {
        adjustments: {
            neighborhoodAdjustment: positiveAdjustmentNeighborhood,
            locationInNeighborhoodAdjustment: positiveAdjustmentLocation
        },
        locationDiscussionDiscussionText: ""
    },
    {
        adjustments: {
            neighborhoodAdjustment: 0,
            locationInNeighborhoodAdjustment: 0
        },
        locationDiscussionDiscussionText: ""
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4227", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    adjustmentName: Enums.SALES_ADJUSTMENT_GRID.locationAdjustment,
    compProperty,
    compStatusDate,
    calculationUnits: Enums.CALCULATION_UNITS.perResidentialUnits,
    comparablesAdjustments: _compsFixture,
    discussionSection: Enums.ADJUST_COMPS_DISCUSSION_SECTIONS.location,
    locationDiscussionTitle: Enums.ADJUST_COMPS_DISCUSSION_TITLES.locationDiscussion,
    kitchenCondition,
    bathroomCondition,
    bedroomCondition,
    livingRoomCondition
};