import { BoweryAutomation } from "../../../../../types/boweryAutomation.type";
import ReportDataCreator from "../../../../data_creator/reportData.creator";
import Enums from "../../../../../enums/enums";
import { BoweryReports } from "../../../../../types/boweryReports.type";

const _reportCreationData: BoweryAutomation.ReportCreationData = ReportDataCreator
    .getReportData("4613_14_16_20", {
        incomeValue: Enums.INCOME_TYPE.both
    });

export default {
    reportCreationData: _reportCreationData,
    otherUse: {
        name: "use",
        value: Enums.COMMERCIAL_UNITS_USE_VALUES.other,
        type: "dropdown"

    } as BoweryReports.RentCompField,
    otherUseText: Enums.COMMERCIAL_UNITS_USE_TEXTS.other,
    otherUseInput: {
        name: "otherUse",
        value: "some use",
        type: "input"
    } as BoweryReports.RentCompField,
    baseRent: 15000,
    squareFeet: 500.15,
    tenantName: {
        name: "tenantName",
        value: "some test tenant name",
        type: "input"
    } as BoweryReports.RentCompField,
    industrialUse: {
        name: "use",
        value: Enums.COMMERCIAL_UNITS_USE_VALUES.industrial,
        type: "dropdown"
    } as BoweryReports.RentCompField,
    sourceOfInfo: {
        name: "sourceOfInformation",
        value: "bowerySubject",
        type: "dropdown"
    } as BoweryReports.RentCompField,
    unitOfMeasure: Enums.UNITS_OF_MEASURE.annually
};
