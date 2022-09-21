const featureFlagKeys = {
    flexibleTaxes: "flexible-taxes",
    prefillInspectionDateFromSalesforce: "prefill-inspection-date-from-salesforce",
    reportTextEdit: "report-text-edit",
    swotAnalysis: "edit-default-swot-analysis",
    enableFlexibleGbaAnalysis: "enable-flexible-gba-analysis",
    retailReports: "retail-reports",
    cmsNavigation: "cms-navigation",
    showSubjectPropertyData: "form_dataCollections.subjectProperty",
    prefillInspectorFromSalesforce: "prefill-inspector-from-salesforce"
} as const;

export default Object.freeze(featureFlagKeys);