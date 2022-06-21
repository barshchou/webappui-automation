import addCompFormActions from "./addCompForm.actions";
import rentCompsActions from "./rentComps.actions";
import { _CompSummary, _PropertyConditions, _UnitMix } from "./full_building_comps";

export default {
    AddForm: addCompFormActions,
    BaseActions: rentCompsActions,
    FullBuildingComps: {
        _UnitMix: _UnitMix,
        _PropertyConditions: _PropertyConditions,
        _CompSummary: _CompSummary
    }
};