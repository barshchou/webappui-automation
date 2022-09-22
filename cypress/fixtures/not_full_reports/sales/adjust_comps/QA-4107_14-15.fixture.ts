import { Filter } from "mongodb";
import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const comparableFixture = () => {
    return {
        sizeAdjustment: 20,
        conditionAdjustment: -30,
        otherAdjustment: 40,
        propertyRights: -60
    };
};

const compProperty = Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleStatus;
const compStatusDate = Enums.COMP_PROPERTIES_PATHS_DB.saleStatusValuesInDB.date;

const filter: Filter<object> = { $or: [ { [compProperty]: compStatusDate } ] };

export default {
    reportMixedCreationData: ReportDataCreator.getReportData("4107", { incomeValue: Enums.INCOME_TYPE.both }),
    reportCreationData: ReportDataCreator.getReportData("4114-15"),
    calculationUnits: [ Enums.CALCULATION_UNITS.psf, Enums.CALCULATION_UNITS.perResidentialUnits ],
    comparable: Object.freeze(comparableFixture()),
    compProperty,
    compStatusDate,
    filter
};