import Enums from "../../../../enums/enums";

export default {
    dateType: "dueDate",
    verifyValue: "03-16-2021",
    conclusionValues: [
        Enums.VALUE_CONCLUSION_TYPE.AS_IS,
        Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
        Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE
    ] as Array<BoweryReports.ConclusionValue>
};