import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return {
        address: "462 1st Avenue, New York, USA",
        reportNumber: "TestAutoReport",
        templateValue: Enums.TEMPLATE_TYPE.FREDDIE_MAC,
        incomeValue: Enums.INCOME_TYPE.BOTH,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    };
};

const commentaryFixture = () => {
    return {
        generatedCommentary: "The comparable sales exhibited a range between undefined per square foot and undefined " +
            "per square foot with an average of $0.00 per square foot and a median of $0.00 per square foot. Thus, " +
            "considering the elements of comparison noted above, our opinion of market value is $0.00 per square foot.",
        newCommentary: "some new commentary"
    };
};

export default {
    reportCreationData: Object.freeze(reportCreationFixture()),
    commentaryData: Object.freeze(commentaryFixture())
};