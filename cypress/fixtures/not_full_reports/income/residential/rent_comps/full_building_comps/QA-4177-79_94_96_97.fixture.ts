import { BoweryAutomation } from "../../../../../../types";
import ReportDataCreator from "../../../../../data_creator/reportData.creator";


const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4177-79");
const _itemizedUnitInfoHeaders: string[] = [ "Include", "#", "# Unit", "# Bedrooms", "# Bathrooms", "# Rooms", "Square Feet",
                                "Outdoor Space", "Rent Type", "Monthly Rent", "Rent/Room" ];
const _unitMixHeaders: string[] = [ "Unit Group", "Units", "Avg Baths", "Avg Rooms", "Min Rent", "Avg Rent", "Max Rent",
                                    "Avg Square Feet", "Avg Rent/Room", "Avg Rent/SF/Month", "Avg Rent/SF/Year" ];

export default {
    reportCreationData: _reportCreationData,
    compAddress: "508 Broadway",
    regularResNum: 5,
    otherRegularResNum: 3,
    stringResNumb: "!@#$%^&*()?Some text",
    rooms: 5,
    bedrooms: 2,
    squareFeet: 1500,
    monthlyRent: 20000.598,
    itemizedUnitInfoHeaders: _itemizedUnitInfoHeaders,
    unitMixHeaders: _unitMixHeaders,
    unitsQuantity4194: 3
};