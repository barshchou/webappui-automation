import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const commentaryFixture = () => {
    return {
        generatedCommentary: "The comparable sales exhibited a range between undefined per square foot and undefined " +
            "per square foot with an average of $0.00 per square foot and a median of $0.00 per square foot. Thus, " +
            "considering the elements of comparison noted above, our opinion of market value is $0.00 per square foot.",
        newCommentary: "some new commentary"
    };
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4326", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    commentaryData: Object.freeze(commentaryFixture())
};