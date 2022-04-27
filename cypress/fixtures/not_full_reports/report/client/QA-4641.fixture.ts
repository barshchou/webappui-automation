import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED, "4641"),
    textToType: "=",
    verifyListValues: [
        'Block', 
        'Building Name', 
        'Concluded Cap Rate', 
        'Condition', 
        'Foreclosure Sale', 
        'Gross Building Area', 
        'Lot', 
        'Property Type', 
        'Residential Unit Count', 
        'Sherrif\'s Sale', 
        'Site Area', 
        'Street Address', 
        'Street Name', 
        'Unchanged Renovations', 
        'Year Built', 
        'Zone(s)'
    ],
    typeListValues: [
        'Bloc', 
        'Buildin', 
        'Conclude', 
        'Conditio', 
        'Foreclosur', 
        'Gros', 
        'Lo', 
        'Propert', 
        'Residentia', 
        'Sherri', 
        'Sit', 
        'Stree', 
        'Stree', 
        'Unchange', 
        'Yea', 
        'Zone'
    ]
};