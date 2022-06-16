import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const createReportData = conclusion => {
    return ReportDataCreator.getReportData("4606", { incomeValue: Enums.INCOME_TYPE.BOTH, conclusionValue: conclusion });
};

const _conclusionValue: Array<BoweryReports.ConclusionValue> = [
    Enums.VALUE_CONCLUSION_TYPE.AS_IS,
    Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
    Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
]; 


export default {
    conclusionValue: _conclusionValue,
    propertyCondition: "Satisfactory",
    calculationUnits: [ "PSF", "Per Residential Units" ],
    address: "200 West 78 Street",
};