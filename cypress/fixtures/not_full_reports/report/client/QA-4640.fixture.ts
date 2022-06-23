import enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import chipsDataCreator from "../../../data_creator/chipsData.creator";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const _buildingName = 'Test Building Name QA-4640';

const _chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: _buildingName,
};

export default {
    reportCreationData: ReportDataCreator.getReportData("4640", {
        incomeValue: enums.INCOME_TYPE.both
    }),
    textToType: "=",
    chips: chipsDataCreator.getChipsData(_chipsOptions, enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    buildingName: _buildingName,
    intendedUserCommentaryTitle: "Intended User",
    identificationOfTheClientCommentaryTitle: "Identification of the Client"
};