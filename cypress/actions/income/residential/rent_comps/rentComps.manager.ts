import addCompFormActions from "./addCompForm.actions";
import rentCompsActions from "./rentComps.actions";
import fullBuildingCompsManager from "./full_building_comps/fullBuildingComps.manager";

export default {
    AddForm: addCompFormActions,
    BaseActions: rentCompsActions,
    FullBuildingComps: fullBuildingCompsManager
};