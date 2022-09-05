import Enums from "../../../../enums/enums";
import ReportDataCreator from "../../../data_creator/reportData.creator";
import chipsDataCreator from '../../../data_creator/chipsData.creator';
import { BoweryReports } from "../../../../types/boweryReports.type";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData("4641", { templateValue:Enums.TEMPLATE_TYPE.notFreddieMac,
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED });
};

const buildingName = 'Test Building Name QA-4641';

const chipsOptions: BoweryReports.ChipsCreationOptions = {
    buildingName: buildingName,
};

const chipNames = [ "Client Organization", "Client Company" ];

export default {
    reportCreationData: reportCreationFixture(),
    textToType: "=",
    chips: chipsDataCreator.getChipsData(chipsOptions, Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED),
    buildingName: buildingName,
    intendedUserCommentaryTitle: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    identificationOfTheClientCommentaryTitle:  Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    identificationOfTheClientSection: Enums.EXPORT_TITLES.identificationOfTheClient,
    intendedUseSection: Enums.EXPORT_TITLES.intendedUseAndUser,
    chipNames
};