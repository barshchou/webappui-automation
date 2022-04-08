import rentRollActions from "./rentRoll.actions";
import stabilizedRentRollActions from "./stabilizedRentRoll.actions";
import commercialRentCompsActions from "./rentComps.actions";
import compGroupsActions from "./compGroups.actions";
import rentReconciliationActions from "./rentReconciliation.actions";

export default {
    InPlaceRentRoll: rentRollActions,
    StabilizedRentRoll: stabilizedRentRollActions,
    RentComps: commercialRentCompsActions,
    CompGroups: compGroupsActions,
    RentReconciliation: rentReconciliationActions
};