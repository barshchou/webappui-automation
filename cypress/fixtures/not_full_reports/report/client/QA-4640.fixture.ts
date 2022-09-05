import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import chipsDataCreator from "../../../data_creator/chipsData.creator";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const buildingName = 'Test Building Name QA-4640';

const chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName
};

const chipNames = [ "Client Organization", "Client Company" ];

export default {
    reportCreationData: ReportDataCreator.getReportData("4640", {
        incomeValue: Enums.INCOME_TYPE.both
    }),
    textToType: "=",
    chips: chipsDataCreator.getChipsData(chipsOptions, Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    buildingName,
    intendedUserCommentaryTitle: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClientCommentaryTitle: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    identificationOfTheClientSection: Enums.EXPORT_TITLES.identificationOfTheClient,
    intendedUseSection: Enums.EXPORT_TITLES.intendedUseAndUser,
    chipNames
};