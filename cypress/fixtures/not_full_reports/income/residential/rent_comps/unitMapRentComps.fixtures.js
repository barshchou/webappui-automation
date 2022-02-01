import Enums from "../../../../../enums/enums";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const dataFixture = () => {
    return {
        unitTypesQaAttrs: ["typical", "duplex", "triplex", "simplex", "loft",
            "garden style", "basement", "garage", "penthouse"],
        minRentValue: "465,524.31",
        maxRentValue: "700,000.55",
        minSquareFeet: "57.09",
        maxSquareFeet: "200.4",
        numberOfBedroomsQaAttr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        sourceOfInfoQaAttr: ["bowery subject", "external database", "other"],
        dateInputTypes: ["min", "max"],
        amenitiesQaAttr: ["none", "backyard", "balcony", "roof", "terrace", "building laundry", "in-unit laundry"],
        sortByOptions: ["Oldest", "Smallest", "Largest", "Newest"],
        comparableIndex: 0,
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