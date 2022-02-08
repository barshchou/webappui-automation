import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const dataFixture = () => {
    return {
        unitTypesQaAttrs: ["typical", "duplex", "triplex", "simplex", "loft",
            "garden style", "basement", "garage", "penthouse"],
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