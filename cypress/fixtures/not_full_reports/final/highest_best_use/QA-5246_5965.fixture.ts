import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const typesAs: BoweryReports.FeasiblePropertyType[] = [
    Enums.FEASIBLE_PROPERTY_TYPES.MultiFamily,
    Enums.FEASIBLE_PROPERTY_TYPES.ResidentialCondo,
    Enums.FEASIBLE_PROPERTY_TYPES.IndustrialCondo,
    Enums.FEASIBLE_PROPERTY_TYPES.OfficeCondo,
    Enums.FEASIBLE_PROPERTY_TYPES.MixedUseCommercialApartment,
    Enums.FEASIBLE_PROPERTY_TYPES.RetailSpace,
    Enums.FEASIBLE_PROPERTY_TYPES.OfficeSpace,
    Enums.FEASIBLE_PROPERTY_TYPES.IndustrialSpace
];

export default {
    reportCreationData: ReportDataCreator.getReportData("5246"),
    textToType: "test chip",
    typesAs,
};