import enums from "../../../../enums/enums";
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
        incomeValue: enums.INCOME_TYPE.both
    }),
    textToType: "=",
    chips: chipsDataCreator.getChipsData(chipsOptions, enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    buildingName,
    intendedUserCommentaryTitle: "Intended User",
    identificationOfTheClientCommentaryTitle: "Identification of the Client",
    identificationOfTheClientSection: enums.EXPORT_TITLES.identificationOfTheClient,
    intendedUseSection: enums.EXPORT_TITLES.intendedUseAndUser,
    chipNames,
    color: "rgb(210, 65, 65)",
    backgroundColor: "rgb(255, 233, 233)"
};