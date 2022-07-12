import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        propertyRights: -70,
        trendedPrice: "$432.35"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4109", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED
    }),
    calculationUnits: "PSF",
    comparable: Object.freeze(comparableFixture())
};