import enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import reportDataCreator from "../../../data_creator/reportData.creator";

const imagesTypesFixture = (): BoweryReports.ImageType[] => {
    return [ "Interior Images", "Exterior Images" ];
};

const inputTypesFixture = (): BoweryReports.InputType[] => {
    return [ "drag-n-drop", "input" ];
};

export default {
    reportCreationData: reportDataCreator.getReportData("4556-57", {
        incomeValue: enums.INCOME_TYPE.both
    }),
    numberOfCommercialUnits: 2,
    imagesType: imagesTypesFixture(),
    inputType: inputTypesFixture(),
    imageFile:"/full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos/exterior_entrance_1.png",
    imageRotations: [ 1, 2, 3 ]
};