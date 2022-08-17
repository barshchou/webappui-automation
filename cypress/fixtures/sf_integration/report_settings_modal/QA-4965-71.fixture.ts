import Enums from "../../../enums/enums";

export default {
    address: "462 1st Avenue",
    sfJobs: {
        withFreddieMac: Enums.SALESFORCE_JOBS.withFreddieMac,
        withoutFreddieMac: Enums.SALESFORCE_JOBS.withoutFreddieMac,
        noneFreddieMac: Enums.SALESFORCE_JOBS.noneFreddieMac,
        multifamily: Enums.SALESFORCE_JOBS.multifamily,
        mixedUse: Enums.SALESFORCE_JOBS.mixedUse,
        retail: Enums.SALESFORCE_JOBS.retail,
        nonePropertyType: Enums.SALESFORCE_JOBS.nonePropertyType
    },
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.retailReports,
    onFeatureFlag: 0
};