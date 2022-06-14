import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4484_86_88-90", {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

export default {
    reportCreationData: reportCreationFixture(),
    value:"=F",
    unchangeRennovation: "Foreclosure Sale",
    verifyAreaValue: 'The above transaction reflects a foreclosure sale of the property. ' +
                    'Typically in a foreclosure sale, the buyer assumes all encumbrances on the site, ' +
                    'including any outstanding mortgage amount and legal fees ("upset costs"), delinquent ' +
                    'taxes and water and sewer charges, foreclosure sale fee, and realty transfer taxes. ' +
                    'This information was requested from the owner; however, not provided.'
};