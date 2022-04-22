import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportSpecificIncomeValue(enums.INCOME_TYPE.BOTH, "4596"),
    numberOfCommercialUnits: 2,
    value:"=S",
    verifyListValue: "Sherrif's Sale",
    verifyAreaValue: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested from the owner; however, not provided."
};