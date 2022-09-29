import Enums from "../../../../enums/enums";

export default {
    allStatusesFromDropdown: [ 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.doNotUse, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.draft, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.confirmed, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.verified, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.any ],
    allStatusesFromDropdownExceptAny: [ 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.doNotUse, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.draft, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.confirmed, 
        Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.verified ],
    statusFromDropdownDoNotUse: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.doNotUse,
    statusFromStatusDropdownDraft: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.draft,
    statusFromDropdownConfirmed: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.confirmed,
    statusFromDropdownVerified: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.verified,
    statusFromDropdownAny: Enums.COMP_STATUS_VALUES_FROM_STATUS_DROPDOWN.statusesFromStatusDropdown.any,

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