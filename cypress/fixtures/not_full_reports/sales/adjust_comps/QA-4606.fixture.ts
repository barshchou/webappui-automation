import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        propertyRights: -60
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4106", { incomeValue: Enums.INCOME_TYPE.BOTH, conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE }),
    calculationUnits: [ "PSF", "Per Residential Units" ],
    comparable: Object.freeze(comparableFixture())
};