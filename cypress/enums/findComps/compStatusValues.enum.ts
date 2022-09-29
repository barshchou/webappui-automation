const statusesFromStatusDropdown = {
    doNotUse: "doNotUse",
    draft: "draft",
    confirmed: "confirmed",
    verified: "verified",
    any: "any"
} as const;

const statusesFromCompsList = {
    doNotUse: "Do Not Use",
    draft: "Draft",
    confirmed: "Confirmed",
    verified: "Verified"
} as const;

export default { 
    statusesFromStatusDropdown, 
    statusesFromCompsList
};