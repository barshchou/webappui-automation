const roles = {
    admin: "Admin",
    leadAppraiser: "Lead Appraiser",
    appraiser: "Appraiser",
    inspector: "Inspector"
} as const;

export default Object.freeze(roles);