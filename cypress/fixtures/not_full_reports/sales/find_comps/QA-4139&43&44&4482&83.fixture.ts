import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4139&43&44&4482&83",
        {
            incomeValue: Enums.INCOME_TYPE.BOTH,
            conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
        }),
    compAddress: "140 E 14th St, New York, NY 10003, USA",
    condition: "Shell",
    comparableType: "Mixed-Use",
    spec4139: {
        numberOfUnitsDefault: 4,
        regularNum: 10000,
        decimalNum: -38.54,
        nonNumberValue: "Some not number",
        longValue: 55555555555555528
    },
    spec4143: {
        regularNumber: 8,
        regularNumOverThousand: 10000,
        decimalNum: -38.54,
        nonNumberValue: "Some not number",
        longValue: 55555555555555528
    },
    spec4144: {
        regularNumber: 850,
        regularNumOverThousand: 10000,
        decimalNum: -38.54,
        nonNumberValue: "Some not number",
        longValue: 55555555555555528
    },
    spec4482: {
        regularNumber: 850,
        regularNumOverThousand: 10000,
        decimalNum: -38.54,
        nonNumberValue: "Some not number",
        longValue: 55555555555555528
    }
};