import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const allCheckboxes = Object.values(Enums.AMENITIES_CHECKBOXES);

const withoutAdditionalCheckboxes = allCheckboxes.filter(unit => !unit.startsWith("building.outdoorSpace"));

const buildingCheckboxes = allCheckboxes.filter(unit => {
    return unit.startsWith("building") && !unit.includes("building.outdoorSpace");
});

const unitCheckboxes = allCheckboxes.filter(unit => unit.startsWith("unit"));

const sharedOutdoorSpaceCheckboxes  = allCheckboxes.filter(unit => unit.startsWith("building.outdoorSpace"));

const generatedCommentName = {
    storageIncomeDiscussion: "storageIncomeDiscussion",
    parkingIncomeDiscussion: "parkingIncomeDiscussion"
};

const doormanRadios = [
    "Virtual",
    "Part-Time",
    "24/7",
    "Other"
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4662_64_67-70_84_6754", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
    }),
    withoutAdditionalCheckboxes,
    buildingCheckboxes,
    unitCheckboxes,
    imagePath: "test_files/Laundry_Room.png",
    storageValue: 1000,
    storageValueMore: 1001,
    parkingValueMore: 2501,
    parkingValue: 5,
    testValue: "some value",
    generatedCommentName,
    parking: Enums.AMENITIES_UPLOADS.parking,
    outdoorSpace: Enums.AMENITIES_UPLOADS.outdoorSpace,
    otherAmenities: Enums.AMENITIES_UPLOADS.otherAmenities,
    otherOutdoorSpace: "building.otherOutdoorSpace",
    otherDoorman: "building.otherDoorman",
    otherBuildingAmenity: "building.otherBuildingAmenity",
    parkingSpaceCount: "building.parkingSpaceCount",
    sharedOutdoorSpaceCheckboxes,
    doormanRadios
};