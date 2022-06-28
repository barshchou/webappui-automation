const reportStatus = {
    draft: "Draft",
    submitted: "Submitted",
    review: "Review",
    approved: "Approved"
} as const;

export default Object.freeze(reportStatus);