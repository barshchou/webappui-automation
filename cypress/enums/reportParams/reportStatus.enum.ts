const reportStatus = {
    draft: "Draft",
    submitted: "Submitted",
    review: "Review",
    approved: "Approved",
    any: "Any"
} as const;

export default Object.freeze(reportStatus);