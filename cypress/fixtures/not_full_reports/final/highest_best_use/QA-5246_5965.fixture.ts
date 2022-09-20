import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const typesAs: BoweryReports.FeasiblePropertyType[] = [
    Enums.FEASIBLE_PROPERTY_TYPES.multiFamily,
    Enums.FEASIBLE_PROPERTY_TYPES.residentialCondo,
    Enums.FEASIBLE_PROPERTY_TYPES.industrialCondo,
    Enums.FEASIBLE_PROPERTY_TYPES.officeCondo,
    Enums.FEASIBLE_PROPERTY_TYPES.mixedUseCommercialApartment,
    Enums.FEASIBLE_PROPERTY_TYPES.retailSpace,
    Enums.FEASIBLE_PROPERTY_TYPES.officeSpace,
    Enums.FEASIBLE_PROPERTY_TYPES.industrialSpace
];

const _sectionsToExport: BoweryReports.SectionsToIncludeInExport[] = [
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.highestAndBestUse,
    Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.zoningSummary
];

export default {
    reportCreationData: ReportDataCreator.getReportData("5246"),
    textToType: "test chip",
    typesAs,
    sectionsToExport: _sectionsToExport
};