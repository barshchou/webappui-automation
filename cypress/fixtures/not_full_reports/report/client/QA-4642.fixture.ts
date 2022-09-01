import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";
import chipsDataCreator from "../../../data_creator/chipsData.creator";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const buildingName = 'Test Building Name QA-4642';

const chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: buildingName,
};

const chipNames = [ "Client Organization", "Client Company" ];

export default {
    reportCreationData: ReportDataCreator.getReportData("4642", {
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE,
        incomeValue: Enums.INCOME_TYPE.both
    }),
    chips: chipsDataCreator.getChipsData(chipsOptions, Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE),
    buildingName,
    identificationOfTheClientSection: Enums.EXPORT_TITLES.identificationOfTheClient,
    intendedUseSection: Enums.EXPORT_TITLES.intendedUseAndUser,
    chipNames
};
