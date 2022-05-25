import rentRollActions from "./rentRoll.actions";
import stabilizedRentRollActions from "./stabilizedRentRoll.actions";
import commercialRentCompsActions from "./rentComps.actions";
import compGroupsActions from "./compGroups.actions";
import rentReconciliationActions from "./rentReconciliation.actions";
import reimbursementSummaryActions from "./reimbursementSummary.actions";

export default {
    InPlaceRentRoll: rentRollActions,
    StabilizedRentRoll: stabilizedRentRollActions,
    RentComps: commercialRentCompsActions,
    ReimbursementSummary: reimbursementSummaryActions,
    CompGroups: compGroupsActions,
    RentReconciliation: rentReconciliationActions
};