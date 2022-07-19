import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4112", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    comparableFirst: {
        address: "200 West 78 Street",
        otherUtilityAdjustment: 2,
    },
    compsAdj: {
        airRightsAdjustment: 3,
        amenitiesAdjustment: 4,
        elevatorAdjustment: 5,
        finishesAdjustment: 6,
        cornerAdjustment: 7,
        commercialAdjustment: 8,
    },

    customUtilitiesAdjustmentDefaultName: "Other Utilities Adjustment",
    newCustomUtilitiesAdjustmentName: "new custom utilities adj name"
};