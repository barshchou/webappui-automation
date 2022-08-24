import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const allCheckboxes = Object.values(Enums.AMENITIES_CHECKBOXES);

const buildingCheckboxes = allCheckboxes.filter(unit => unit.startsWith("building"));

const unitCheckboxes = allCheckboxes.filter(unit => unit.startsWith("unit"));

export default {
    reportCreationData: ReportDataCreator.getReportData("4626-64"),
    allCheckboxes,
    buildingCheckboxes,
    unitCheckboxes
};