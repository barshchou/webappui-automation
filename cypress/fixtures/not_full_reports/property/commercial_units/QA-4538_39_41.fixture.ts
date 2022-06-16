import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryAutomation } from "../../../../types";

const _numberOfCommercialUnits = 3;
const _specialSymbols = '!@#$%^&*()-=+_';
const _copyPasteValue = '12,345';
const _longValue = '1111111111111111111111111111111111111111111111';
const _groosLeasableAreatooltipText = 'This value will be deducted from the GBA to determine the Residential Gross Leasable Area.';
const _commercialUnitSFDiscussionTooltipText = 'The following generated text will appear in the Description of Improvements of your report.';

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator.getReportData("4538_39_41", {
    incomeValue: Enums.INCOME_TYPE.both
});

export default {
    reportCreationData: _reportCreationData,
    specialSymbols: _specialSymbols,
    copyPasteValue: _copyPasteValue,
    groosLeasableAreatooltipText: _groosLeasableAreatooltipText,
    commercialUnitSFDiscussionTooltipText: _commercialUnitSFDiscussionTooltipText,
    longValue: _longValue,
    numberOfCommercialUnits: _numberOfCommercialUnits,
    sfValues: [ 3333, 4444, 5555 ]
};