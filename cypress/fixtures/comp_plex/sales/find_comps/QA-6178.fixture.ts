import Enums from "../../../../enums/enums";

const { 
    doNotUse, draft, 
    confirmed, verified, any  
} = Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown;

// add property alias 
// const { 
//     doNotUse,

// } = Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList;

export default {
    allStatusesFromDropdown: [ 
        doNotUse, 
        draft, 
        confirmed, 
        verified, 
        any ],
    allStatusesFromDropdownExceptAny: [ 
        doNotUse, 
        draft, 
        confirmed, 
        verified ],
    statusFromDropdownDoNotUse: doNotUse,
    statusFromStatusDropdownDraft: draft,
    statusFromDropdownConfirmed: confirmed,
    statusFromDropdownVerified: verified,
    statusFromDropdownAny: any,

    allStatusesFromCompsList: [ 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList.doNotUse,  
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList.draft,  
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList.confirmed,  
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList.verified ],
    statusDoNotUseFromCompsList: Enums.COMP_STATUS_VALUES_FROM_COMPS_LIST.statusesFromCompsList.doNotUse,
    statusDraftFromCompsList: Enums.COMP_STATUS_VALUES_FROM_COMPS_LIST.statusesFromCompsList.draft,
    statusConfirmedFromCompsList: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList.confirmed,
    statusVerifiedFromCompsList: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromCompsList.verified,
};