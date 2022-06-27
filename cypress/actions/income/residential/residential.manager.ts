import * as rentCompsManager from "./rent_comps";
import expenseStructureActions from "./expenseStructure.actions";
import rentCompsMapActions from "./rentCompsMap.actions";
import rentReconciliationActions from "./rentReconciliation.actions";
import rentRollActions from "./rentRoll.actions";
import stabilizedRentRollActions from "./stabilizedRentRoll.actions";
import stabRentRollSummaryActions from "./stabRentRollSummary.actions";
import unitGroupsActions from "./unitGroups.actions";

export default {
    RentComps: rentCompsManager,
    ExpenseStructure: expenseStructureActions,
    RentCompsMap: rentCompsMapActions,
    RentReconciliation: rentReconciliationActions,
    InPlaceRentRoll: rentRollActions,
    StabilizedRentRoll: stabilizedRentRollActions,
    StabRentRollSummary: stabRentRollSummaryActions,
    UnitGroups: unitGroupsActions
};