import { BoweryAutomation } from "../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4430");
const _minExposureDefault = 6;
const _maxExposureDefault = 9;
const _minExposureCustom = 1;
const _maxExposureCustom = 18;
const _minMarketingCustom = 12;
const _maxMarketingCustom = 99;

export default {
    reportCreationData: _reportCreationData,
    minExposureTimeDefault: _minExposureDefault,
    maxExposureTimeDefault: _maxExposureDefault,
    customMinExposureTime: _minExposureCustom,
    customMaxExposureTime: _maxExposureCustom,
    customMaxMarketingTime: _maxMarketingCustom,
    customMinMarketingTime: _minMarketingCustom,
    exposureTimeDescriptionDefault: "It is our opinion that given the current economic conditions, " + 
    "an exposure time for the subject property is between " + _minExposureDefault + " months and " + 
    _maxExposureDefault + " months. This conclusion is predicated on interviews with local brokers " + 
    "and other real estate industry sources, on information obtained in the verification process of " + 
    "recent sale transactions for similar properties, and our analysis of supply and demand forces " + 
    "in the local market. The value reported herein presumes such an exposure time.",
    exposureTimeDescriptionCustom: "It is our opinion that given the current economic conditions, " + 
    "an exposure time for the subject property is between " + _minExposureCustom + 
    " months and " + _maxExposureCustom + " months. This conclusion is predicated on interviews " + 
    "with local brokers and other real estate industry sources, on information obtained in the " + 
    "verification process of recent sale transactions for similar properties, and our "+
    "analysis of supply and demand forces in the local market. The value reported herein " + 
    "presumes such an exposure time.",
    marketingTimeDescriptionCustom: "It is our opinion that given the current economic conditions, " + 
    "a marketing time for the subject property is between "+ _minMarketingCustom +" months and " + 
    _maxMarketingCustom +" months. This conclusion considers the property’s relative market position, " + 
    "as well as our market value conclusion and it is predicated on interviews with brokers, other real " + 
    "estate industry sources and on information obtained in the verification process."
};