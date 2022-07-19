import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        propertyRights: -60
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4606", { incomeValue: Enums.INCOME_TYPE.both }),
    calculationUnits: [ "PSF", "Per Residential Units" ],
    comparable: Object.freeze(comparableFixture())
};