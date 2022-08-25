import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const allCheckboxes = Object.values(Enums.AMENITIES_CHECKBOXES);

const withoutAdditionalCheckboxes = allCheckboxes.filter(unit => !unit.startsWith("building.outdoorSpace"));

const buildingCheckboxes = allCheckboxes.filter(unit => {
    unit.startsWith("building") && !unit.includes("building.outdoorSpace");
});

const unitCheckboxes = allCheckboxes.filter(unit => unit.startsWith("unit"));

const sharedOutdoorSpaceCheckboxes  = allCheckboxes.filter(unit => unit.startsWith("building.outdoorSpace"));

const generatedCommentName = {
    storageIncomeDiscussion: "storageIncomeDiscussion",
    parkingIncomeDiscussion: "parkingIncomeDiscussion"
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4626-64-65_67-68"),
    withoutAdditionalCheckboxes,
    buildingCheckboxes,
    unitCheckboxes,
    imagePath: "not_full_reports/Laundry_Room.png",
    storageValue: 1000,
    storageValueMore: 1001,
    parkingValueMore: 2501,
    parkingValue: 5,
    testValue: "some value",
    generatedCommentName,
    laundryRoom: "laundryRoom",
    parking: "parking",
    outdoorSpace: "outdoorSpace",
    other: "building.otherOutdoorSpace",
    sharedOutdoorSpaceCheckboxes
};