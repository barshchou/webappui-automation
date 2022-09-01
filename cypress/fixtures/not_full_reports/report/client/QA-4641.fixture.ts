import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import chipsDataCreator from '../../../data_creator/chipsData.creator';
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4641", { templateValue:Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED });
};

const _buildingName = 'Test Building Name QA-4641';

const _chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: _buildingName,
};

export default {
    reportCreationData: reportCreationFixture(),
    textToType: "=",
    chips: chipsDataCreator.getChipsData(_chipsOptions, Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    buildingName: _buildingName,
    intendedUserCommentaryTitle: "Intended User",
    identificationOfTheClientCommentaryTitle: "Identification of the Client",
    identificationOfTheClientSection: Enums.EXPORT_TITLES.identificationOfTheClient,
    intendedUseSection: Enums.EXPORT_TITLES.intendedUseAndUser,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.introduction ]
};