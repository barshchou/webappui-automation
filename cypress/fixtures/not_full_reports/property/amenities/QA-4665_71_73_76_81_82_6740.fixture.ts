import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const uploadValues = [
    {
        specName: "[QA-4665]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasLaundryRoom,
        uploadName: Enums.AMENITIES_UPLOADS.laundryRoom
    },
    {
        specName: "[QA-4671]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasBikeRoom,
        uploadName: Enums.AMENITIES_UPLOADS.bikeRoom
    },
    {
        specName: "[QA-4673]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasGym,
        uploadName: Enums.AMENITIES_UPLOADS.gym
    },
    {
        specName: "[QA-4676]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasPool,
        uploadName: Enums.AMENITIES_UPLOADS.pool
    },
    {
        specName: "[QA-4681]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasRecreationRoom,
        uploadName: Enums.AMENITIES_UPLOADS.recreationRoom
    },
    {
        specName: "[QA-4682]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasCommonLoungeSpace,
        uploadName: Enums.AMENITIES_UPLOADS.commonLoungeSpace
    },
    {
        specName: "[QA-6740]",
        checkboxName: Enums.AMENITIES_CHECKBOXES.hasCourtyard,
        uploadName: Enums.AMENITIES_UPLOADS.courtyard
    }
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4665_71_73_76_81_82_6740", {
        templateValue: Enums.TEMPLATE_TYPE.freddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
    }),
    imagePath: "test_files/Laundry_Room.png",
    uploadValues
};