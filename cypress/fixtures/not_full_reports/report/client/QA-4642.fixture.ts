import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import chipsDataCreator from "../../../data_creator/chipsData.creator";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _buildingName = 'Test Building Name QA-4642';

const _chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: _buildingName,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4642", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
        incomeValue: Enums.INCOME_TYPE.both
    }),
    chips: chipsDataCreator.getChipsData(_chipsOptions, Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE),
    buildingName: _buildingName,
    identificationOfTheClientSection: Enums.EXPORT_TITLES.identificationOfTheClient,
    intendedUseSection: Enums.EXPORT_TITLES.intendedUseAndUser,
    sectionToExport: Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.introduction
};
