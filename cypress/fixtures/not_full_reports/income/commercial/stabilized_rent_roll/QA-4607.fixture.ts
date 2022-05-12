import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4607", {
        incomeValue: Enums.INCOME_TYPE.BOTH
    }),
    numberOfCommercialUnits: 1,
    groupName: "Frontage",
    useRadios: [ "small", "medium", "large", "other" ],
    squareFeet: 1000
};