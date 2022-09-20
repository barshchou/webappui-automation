import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";

const _sectionsToExport: BoweryReports.SectionsToIncludeInExport[] = [
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.coverPage,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.letterOfTransmittal
];

export default {
    reportCreationData: ReportDataCreator.getReportData("1764459005",  {
        templateValue: Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
    }, true),
    clientName: "Moshe Sitorsky",
    sectionsToExport: _sectionsToExport
};