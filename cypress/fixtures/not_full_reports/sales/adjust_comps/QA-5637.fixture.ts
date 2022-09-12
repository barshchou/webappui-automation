import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("5637", { incomeValue: Enums.INCOME_TYPE.residential }),
    calculationUnits: [  Enums.CALCULATION_UNITS.psf,  Enums.CALCULATION_UNITS.perResidentialUnits ]
};