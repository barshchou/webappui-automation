import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _reportFixture = () => {
    return [ 
        {
            reportCreationData: ReportDataCreator.getReportData("5637", { 
                incomeValue: Enums.INCOME_TYPE.residential 
            }),
            calculationUnits: [  Enums.CALCULATION_UNITS.psf,  Enums.CALCULATION_UNITS.perResidentialUnits ],
            testId: "QA-5637"
        },
        {
            reportCreationData: ReportDataCreator.getReportData("5639", { 
                incomeValue: Enums.INCOME_TYPE.commercial 
            }),
            calculationUnits: [  Enums.CALCULATION_UNITS.psf,  Enums.CALCULATION_UNITS.perTotalUnits ],
            testId: "QA-5639"
        }
    ];
};

export default {
    reportFixture: _reportFixture()
};