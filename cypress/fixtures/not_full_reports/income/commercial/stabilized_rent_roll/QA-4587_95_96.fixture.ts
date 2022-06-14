import enums from "../../../../../enums/enums";
import reportDataCreator from "../../../../data_creator/reportData.creator";

export default {
    reportCreationData: reportDataCreator.getReportData("4587_95_96", {
        incomeValue: enums.INCOME_TYPE.both
    }),
    numberOfCommercialUnits: 2,
    sherifsTypeValue: "=S",
    foreclosureTypeValue: "=F",
    verifySherifsListValue: "Sherrif's Sale",
    verifySherifsAreaValue: "The above transaction reflects a Sheriff's sale of the property. Typically in a Sheriff’s sale, "+
    "the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), "+
    "delinquent taxes and water and sewer charges, Sheriff's sale fee, and realty transfer taxes. This information was requested "+
    "from the owner; however, not provided.",
    verifyForeclosureListValue: "Foreclosure Sale",
    verifyForeclosureAreaValue: "The above transaction reflects a foreclosure sale of the property. Typically in a foreclosure sale, "+
    "the buyer assumes all encumbrances on the site, including any outstanding mortgage amount and legal fees (\"upset costs\"), "+
    "delinquent taxes and water and sewer charges, foreclosure sale fee, and realty transfer taxes. This information was requested "+
    "from the owner; however, not provided.",
    tooltipText: "The following generated text will appear in the Income Approach section of your report."
};