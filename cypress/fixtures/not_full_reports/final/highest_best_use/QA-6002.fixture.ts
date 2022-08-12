import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const checkValues = {
    residential: "Residential",
    commercial: "Commercial"
};

const commentNames = {
    improved: Enums.FINANCIALLY_FEASIBLE_COMMENTS_TYPE.improved,
    vacant: Enums.FINANCIALLY_FEASIBLE_COMMENTS_TYPE.vacant
};

export default {
    reportCreationData: ReportDataCreator.getReportData("6002"),
    typeAs:  Enums.FEASIBLE_PROPERTY_TYPES.multiFamily,
    checkValues,
    commentNames
};