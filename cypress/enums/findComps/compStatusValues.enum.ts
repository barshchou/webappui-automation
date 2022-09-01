const statuses = {
    draft: "draft",
    confirmed: "confirmed",
    verified: "verified",
    any: "any"
} as const;

export default Object.freeze(statuses);