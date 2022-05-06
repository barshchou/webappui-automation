import enums from "../../../../enums/enums";
import reportDataCreator from "../../../data_creator/reportData.creator";


export default {
    reportCreationData: reportDataCreator.getReportSpecificIncomeValue(enums.INCOME_TYPE.BOTH, "4556&57"),
    numberOfCommercialUnits: 2,
    imagesType: ["Interior Images", "Exterior Images"],
    inputType:["drag-n-drop","input"],
    imageFile:"/full_reports/full_bowery_multifamily_as_complete/exterior_entrance_photos/exterior_entrance_1.png",
    imageRotations: [1,2,3]
};