import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";


export default {
    reportCreationData: ReportDataCreator.getReportData("4570", { incomeValue: Enums.INCOME_TYPE.BOTH }),
    numberOfCommercialUnits: 1,
};