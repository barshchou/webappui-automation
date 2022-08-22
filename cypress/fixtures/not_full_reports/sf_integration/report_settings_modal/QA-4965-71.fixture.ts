import Enums from "../../../../enums/enums";

export default {
    address: "462 1st Avenue",
    sfJobs: {
        withFreddieMac: Enums.REPORT_TYPES_SF.withFreddieMac,
        withoutFreddieMac: Enums.REPORT_TYPES_SF.withoutFreddieMac,
        noneFreddieMac: Enums.REPORT_TYPES_SF.noneFreddieMac,
        multifamily: Enums.REPORT_TYPES_SF.multifamily,
        mixedUse: Enums.REPORT_TYPES_SF.mixedUse,
        retail: Enums.REPORT_TYPES_SF.retail,
        nonePropertyType: Enums.REPORT_TYPES_SF.nonePropertyType
    },
    featureFlagKey: Enums.FEATURE_FLAG_KEYS.retailReports,
    onFeatureFlag: 0
};