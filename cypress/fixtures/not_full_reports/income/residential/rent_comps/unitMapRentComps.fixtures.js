import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const dataFixture = () => {
    return {
        unitTypesQaAttrs: ["typical", "duplex", "triplex", "simplex", "loft",
            "garden style", "basement", "garage", "penthouse"],
        minRentValue: "465,524.31",
        maxRentValue: "700,000.55",
        numberOfUnits: 0
    };
};

export const data = () => {
    return Object.freeze(dataFixture());
};

export default {
    reportCreationData: ReportDataCreator.getReportSpecificIncomeValue(Enums.INCOME_TYPE.BOTH, "UnitMapRentComps"),
    data: data()
};