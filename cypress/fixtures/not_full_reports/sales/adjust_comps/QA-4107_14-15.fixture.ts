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
    reportMixedCreationData: ReportDataCreator.getReportData("4107", { incomeValue: Enums.INCOME_TYPE.both }),
    reportCreationData: ReportDataCreator.getReportData("4114-15"),
    calculationUnits: [ "PSF", "Per Residential Units" ],
    comparable: Object.freeze(comparableFixture()),
    compsToAdd: [ 0, 1 ],
};