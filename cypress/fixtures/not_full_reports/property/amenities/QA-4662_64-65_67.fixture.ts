import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const allCheckboxes = Object.values(Enums.AMENITIES_CHECKBOXES);

const buildingCheckboxes = allCheckboxes.filter(unit => unit.startsWith("building"));

const unitCheckboxes = allCheckboxes.filter(unit => unit.startsWith("unit"));

const generatedCommentName = {
    storageIncomeDiscussion: "storageIncomeDiscussion"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4626-64-65_67"),
    allCheckboxes,
    buildingCheckboxes,
    unitCheckboxes,
    imagePath: "not_full_reports/Laundry_Room.png",
    storageValue: 1000,
    storageValueMore: 1001,
    testValue: "some value",
    generatedCommentName
};