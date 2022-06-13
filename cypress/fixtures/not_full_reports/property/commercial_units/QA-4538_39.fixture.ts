import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";

const _numberOfCommercialUnits = 3;
const _specialSymbols = '!@#$%^&*()-=+_';
const _copyPasteValue = '12,345';
const _longValue = `1111111111111111111111111111111111111111111111`;

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4538_39", {
    incomeValue: Enums.INCOME_TYPE.BOTH
});

export default {
    reportCreationData: _reportCreationData,
    specialSymbols: _specialSymbols,
    copyPasteValue: _copyPasteValue,
    longValue: _longValue,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    sfValues: [ 3333, 4444, 5555 ]
};