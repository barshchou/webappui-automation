import rentRollActions from "./rentRoll.actions";
import stabilizedRentRollActions from "./stabilizedRentRoll.actions";
import commercialRentCompsActions from "./rentComps.actions";
import compGroupsActions from "./compGroups.actions";
import rentReconciliationActions from "./rentReconciliation.actions";
import stabilizedLeaseStructureActions from "./stabilizedLeaseStructure.actions";
import reimbursementSummaryActions from "./reimbursementSummary.actions";
import compGroupDiscussionActions from "./compGroupDiscussion.actions";

export default {
    InPlaceRentRoll: rentRollActions,
    StabilizedRentRoll: stabilizedRentRollActions,
    RentComps: commercialRentCompsActions,
    ReimbursementSummary: reimbursementSummaryActions,
    CompGroups: compGroupsActions,
    CompGroupsDiscussion: compGroupDiscussionActions,
    RentReconciliation: rentReconciliationActions,
    StabilizedLeaseStructure : stabilizedLeaseStructureActions
};