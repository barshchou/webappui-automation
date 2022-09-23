import { Filter } from "mongodb";
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const compBuildingType = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.buildingType;
const compBuildingTypeValue = Enums.COMP_PROPERTIES_PATHS_DB.buildingTypeValues.walkup;
const filter: Filter<object> = { $or: [ { [compBuildingType]:compBuildingTypeValue } ] };
const positiveCommercialAdjustment = 70;
const positiveCornerAdjustment = 60;
const positiveFinishesAdjustment = 50;
const positiveElevatorAdjustment = 40;
const positiveAmenitiesAdjustment = 30;
const positiveAirRightsAdjustment = 20;
const positiveOtherAdjustment = 15;
const negativeCommercialAdjustment = -70;
const negativeCornerAdjustment = -60;
const negativeFinishesAdjustment = -50;
const negativeElevatorAdjustment = -40;
const negativeAmenitiesAdjustment = -30;
const negativeAirRightsAdjustment = -20;
const negativeOtherAdjustment = -15;
const kitchenCondition = "Good";
const bathroomCondition = "Good";
const bedroomCondition = "Good";
const livingRoomCondition = "Good";
const midBlockValue = "Mid-Block";
const cornerBuildingType = "Corner";
const elevatorBuildingType = "elevator";
const walkupBuildingType = "walk-up";
const incomeValueTypeMixedUse = Enums.INCOME_TYPE.both;
const incomeValueTypeMultifamily = Enums.INCOME_TYPE.residential;
const otherAdjustmentLocator = 'otherAdjustment[0]';

const baseDiscussionComment = (incomeType: string, cornerType: string, buildingType: string) => {
    let buildingTypeAdjusted = buildingType === 'elevator' ? 'elevatored' : 'walk-up';
    return "The subject is a "+ incomeType.replace('-', ' ') +
    ", "+ cornerType.toLocaleLowerCase().replace('-', ' ') +", "+ buildingTypeAdjusted +" building. It features a "+ 
    kitchenCondition.toLocaleLowerCase() +
    " quality kitchen, "+ livingRoomCondition.toLocaleLowerCase() +" living, "+ 
    bedroomCondition.toLocaleLowerCase() +" bedroom, and "
    + bathroomCondition.toLocaleLowerCase() +" bathroom area finishes. " + 
    "The subject property features the following amenities: laundry room.\n" + 
    "We have considered corner vs. mid-block location, unit and property finishes, walk-up vs. elevator, " + 
    "unit and building amenities, and commercial space within the scope of the utility adjustment.";
};

const cornerText = (cornerType: string, adjustment: number) => {
    let text = "";
    if (cornerType === "Corner") {
        text = "Corner: Corners provide superior exposure. Comparable 1 is located mid-block, and thus " + 
        "required a "+ adjustment +"% upward adjustment.\n";
    } else {
        text = "Corner: Corners provide superior exposure. Comparable 1 is located on a corner, and thus required a " 
        + Math.abs(adjustment) +"% downward adjustment.\n";
    }
    return text;
};

const elevatorText = (buildingType: string, adjustment: number) => {
    let text = "";
    let adjustmentDirection = adjustment < 0 ? "downward" : "upward";
    if (buildingType === "walk-up") {
        text = "Elevator: The subject property is a walk-up. Elevatored buildings typically command a higher price "+ 
        "per square foot. Comparable 1 is a walk-up, and thus required a "+ 
        Math.abs(adjustment) +"% "+ adjustmentDirection +" adjustment.\n";
    } else {
        text = "Elevator: The subject property has an elevator. Elevatored buildings typically command a " + 
        "higher price per square foot. Comparable 1 is a walk-up, and thus required a "+ 
        Math.abs(adjustment) +"% "+ adjustmentDirection +" adjustment.\n";
    }
    return text;
};

const commercialSpace = (incomeType: string, adjustment: number) => {
    let text = "";
    if (incomeType == Enums.INCOME_TYPE.residential) {
        text = "Commercial Space: Commercial space typically commands a higher price per square foot. " + 
        "Comparable 1 has commercial space, and thus required a "+ Math.abs(adjustment) +"% downward adjustment.\n";
    } else {
        text = adjustment < 0 
            ? "Commercial Space: Commercial space typically commands a higher price per square foot. " + 
            "Comparable 1 is located on a superior commercial corridor, and thus required a "+ Math.abs(adjustment) +
            "% downward adjustment.\n"
            : "Commercial Space: Commercial space typically commands a higher price per square foot. " + 
            "Comparable 1 does not have commercial space, and thus required a "+ adjustment +
            "% upward adjustment.\n";
    }
    return text;
};
    
const _compsFixture = (incomeType: string, cornerType: string, buildingType: string) => [
    {
        adjustments: { 
            commercialAdjustment: positiveCommercialAdjustment,
            cornerAdjustment: positiveCornerAdjustment,
            finishesAdjustment: positiveFinishesAdjustment,
            elevatorAdjustment: positiveElevatorAdjustment,
            amenitiesAdjustment: positiveAmenitiesAdjustment,
            airRightsAdjustment: positiveAirRightsAdjustment,
            [otherAdjustmentLocator]: positiveOtherAdjustment
        },
        utilitiesDiscussionText: baseDiscussionComment(incomeType, cornerType, buildingType) +

        "Based on these factors, the following adjustments were made to the comparables, while other minor " + 
        "differences were considered qualitatively in the sale value conclusion.\n" +

        commercialSpace(incomeType, positiveCommercialAdjustment) +

        cornerText(cornerType, positiveCornerAdjustment) +

        elevatorText(buildingType, positiveElevatorAdjustment) +

        "Finishes: Comparable 1 feature inferior interior finishes, and thus required a "
        + positiveFinishesAdjustment +"% upward adjustment.\n" +

        "Amenities: Comparable 1 features inferior amenities, and thus required a "+ 
        positiveAmenitiesAdjustment +"% upward adjustment.\n" + 

        "Air Rights: The subject property contains unused air rights. Comparable 1 does not contain " + 
        "significant additional air rights, and thus required a "+ 
        positiveAirRightsAdjustment +"% upward adjustment.\n"+

        "Other Utilities Adjustment:  Comparable 1 required a "+ positiveOtherAdjustment +"% upward adjustment.\n",
    },
    {
        adjustments: {
            commercialAdjustment: negativeCommercialAdjustment,
            cornerAdjustment: negativeCornerAdjustment,
            finishesAdjustment: negativeFinishesAdjustment,
            elevatorAdjustment: negativeElevatorAdjustment,
            amenitiesAdjustment: negativeAmenitiesAdjustment,
            airRightsAdjustment: negativeAirRightsAdjustment,
            [otherAdjustmentLocator]: negativeOtherAdjustment
        },
        utilitiesDiscussionText: baseDiscussionComment(incomeType, cornerType, buildingType) + 

        "Based on these factors, the following adjustments were made to the comparables, while other minor " + 
        "differences were considered qualitatively in the sale value conclusion.\n" +
        
        commercialSpace(incomeType, negativeCommercialAdjustment) + 

        cornerText(cornerType, negativeCornerAdjustment) +

        elevatorText(buildingType, negativeElevatorAdjustment) +

        "Finishes:  Comparable 1 feature superior interior finishes, and thus required a "+ 
        Math.abs(negativeFinishesAdjustment) +"% downward adjustment.\n" + 

        "Amenities:  Comparable 1 features superior amenities, and thus required a "+ 
        Math.abs(negativeAmenitiesAdjustment) +"% downward adjustment.\n" +

        "Air Rights: The subject property contains unused air rights. Comparable 1 contains significantly " + 
        "more additional air rights, and thus required a "+ Math.abs(negativeAirRightsAdjustment) +
        "% downward adjustment.\n"+

        "Other Utilities Adjustment:  Comparable 1 required a "+ 
        Math.abs(negativeOtherAdjustment) +"% downward adjustment.\n"
    },
    {
        adjustments: {
            commercialAdjustment: 0,
            cornerAdjustment: 0,
            finishesAdjustment: 0,
            elevatorAdjustment: 0,
            amenitiesAdjustment: 0,
            airRightsAdjustment: 0,
            [otherAdjustmentLocator]: 0
        },
        utilitiesDiscussionText: baseDiscussionComment(incomeType, cornerType, buildingType) +
        
        "All comparables used in this analysis have similar utility; therefore, no adjustments were required.\n"
    }
];

const reportCreationFixture = [
    {
        reportCreationData: ReportDataCreator.getReportData("4227", {
            incomeValue: incomeValueTypeMixedUse
        }),
        corner: cornerBuildingType,
        elevator: elevatorBuildingType,
        compFixture: _compsFixture(incomeValueTypeMixedUse, cornerBuildingType, elevatorBuildingType)
    },
    {
        reportCreationData: ReportDataCreator.getReportData("4227", {
            incomeValue: incomeValueTypeMultifamily
        }),
        corner: midBlockValue,
        elevator: walkupBuildingType,
        compFixture: _compsFixture(incomeValueTypeMultifamily, midBlockValue, walkupBuildingType)
    }
];

export default {
    reportCreationData: reportCreationFixture,
    calculationUnits: Enums.CALCULATION_UNITS.perResidentialUnits,
    discussionSection: Enums.ADJUST_COMPS_DISCUSSION_SECTIONS.utility,
    utilityDiscussion: Enums.ADJUST_COMPS_DISCUSSION_TITLES.utilityDiscussion,
    kitchenCondition,
    bathroomCondition,
    bedroomCondition,
    livingRoomCondition,
    filter
};