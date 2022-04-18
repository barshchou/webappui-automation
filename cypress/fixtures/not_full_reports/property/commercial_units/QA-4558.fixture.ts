import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4558", {
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    numberOfCommercialUnits: 1,
    groupName: "Use",
    defaultUse: "undetermined",
    useRadios: ["retail", "office", "medical", "community", "industrial", "other", "undetermined"],
    otherValue: "Jeronimo"
};