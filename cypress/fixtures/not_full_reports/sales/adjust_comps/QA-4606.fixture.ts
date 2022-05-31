import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export const createReportData = conclusion => {
    return ReportDataCreator.getReportData("4106", { incomeValue: Enums.INCOME_TYPE.BOTH, conclusionValue: conclusion });
};

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        propertyRights: -60
    };
};

const _conclusionValue: Array<BoweryReports.ConclusionValue> = [
    Enums.VALUE_CONCLUSION_TYPE.AS_IS,
    Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
    Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
]; 


export default {
    conclusionValue: _conclusionValue,
    calculationUnits: [ "PSF", "Per Residential Units" ],
    comparable: Object.freeze(comparableFixture())
};