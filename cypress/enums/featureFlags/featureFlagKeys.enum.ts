const featureFlagKeys = {
    flexibleTaxes: "flexible-taxes",
    prefillInspectionDateFromSalesforce: "prefill-inspection-date-from-salesforce",
    reportTextEdit: "report-text-edit",
    swotAnalysis: "edit-default-swot-analysis",
    enableFlexibleGbaAnalysis: "enable-flexible-gba-analysis",
    cmsNavigation: "cms-navigation"
} as const;

export default Object.freeze(featureFlagKeys);