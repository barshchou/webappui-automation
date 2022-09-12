import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const allCheckboxes = Object.values(Enums.AMENITIES_CHECKBOXES);

const allUploadInputs = Object.values(Enums.AMENITIES_UPLOADS);

const allInputs = Object.values(Enums.AMENITIES_INPUTS);

const withoutAdditionalCheckboxes = allCheckboxes.filter(
    unit => !unit.startsWith("building.outdoorSpace") && !unit.startsWith("hasNo")
);

const unitInputs = allInputs.filter(unit => unit.startsWith("unit"));

const buildingInputs = allInputs.filter(unit => unit.startsWith("building"));

const sharedOutdoorSpaceCheckboxes  = allCheckboxes.filter(unit => unit.startsWith("building.outdoorSpace"));

export default {
    reportCreationData: ReportDataCreator.getReportData("4694"),
    enterValue: "Lorem Ipsum is simply dummy text he leap into. 1234567890:?;№!@#$%^&*(){}<>",
    numberValue: 10,
    imagePath: "not_full_reports/test_files/Laundry_Room.png",
    withoutAdditionalCheckboxes,
    allUploadInputs,
    unitInputs,
    buildingInputs,
    sharedOutdoorSpaceCheckboxes,
    otherOutdoorSpace: "building.otherOutdoorSpace",
    doormanRadio: "Virtual"
};