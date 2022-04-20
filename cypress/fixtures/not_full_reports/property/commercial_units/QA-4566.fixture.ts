import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "4566"),
    numberOfCommercialUnits: 1,
    groupName: "Frontage",
    useRadios: ["small", "medium", "large", "other"]
};