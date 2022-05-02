import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        address: "200 West 78 Street",
        propertyRights: -70,
        trendedPrice: "$432.35"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportSpecificConclusionValue(Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED, "4109"),
    calculationUnits: "PSF",
    comparable: Object.freeze(comparableFixture())
};