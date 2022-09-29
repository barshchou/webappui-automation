import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("5077");
};

const _customCategory: BoweryReports.ForecastItem = {
    name: "Heating",
    basis: Enums.UNIT_SF.unit,
    forecast: 4
};

const residentialUnits = 3;
const grossBuildingArea = 3000;
const textUpdate = "some text update";

export default {
    reportCreationData: reportCreationFixture(),
    customCategory: _customCategory,
    residentialUnits,
    grossBuildingArea,
    textUpdate
};