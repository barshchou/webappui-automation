import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4430");
const _minExposureDefault = 6;
const _maxExposureDefault = 9;
const _minExposureCustom = 1;
const _maxExposureCustom = 18;

export default {
    reportCreationData: _reportCreationData,
    minExposureTimeDefault: _minExposureDefault,
    maxExposureTimeDefault: _maxExposureDefault,
    customMinExposureTime: _minExposureCustom,
    customMaxExposureTime: _maxExposureCustom,
    exposureTimeDescriptionDefault: "It is our opinion that given the current economic conditions, an exposure time for "+
                                    "the subject property is between " + _minExposureDefault + " months and " + _maxExposureDefault + " months. "+
                                    "This conclusion is predicated on interviews with local brokers and other real estate industry sources, on "+
                                    "information obtained in the verification process of recent sale transactions for similar properties, and our "+
                                    "analysis of supply and demand forces in the local market. The value reported herein presumes such an exposure time.",
    exposureTimeDescriptionCustom: "It is our opinion that given the current economic conditions, an exposure time for "+
                                    "the subject property is between " + _minExposureCustom + " months and " + _maxExposureCustom + " months. "+
                                    "This conclusion is predicated on interviews with local brokers and other real estate industry sources, on "+
                                    "information obtained in the verification process of recent sale transactions for similar properties, and our "+
                                    "analysis of supply and demand forces in the local market. The value reported herein presumes such an exposure time."
};