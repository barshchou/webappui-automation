import ReportDataCreator from "../../../data_creator/reportData.creator";
import ClientCreationData from "../../../data_creator/clientData.creator";
import Enums from "../../../../enums/enums";

export default {
    reportCreationData: ReportDataCreator.getReportData("4627"),
    clientCreationData: ClientCreationData.getDefaultClientData(),
    shortTextToType: "Harl",
    textToType: "Harley Young",
    companyName: "Test Company & CO",
    identificationOfTheClient: Enums.INTRODUCTION_TEXTBOX_NAMES.identificationOfTheClient, 
    intendedUseAndUser: Enums.INTRODUCTION_TEXTBOX_NAMES.intendedUseAndUser,
    applicationNumber:  Enums.COVER_PAGE_LOCATOR_NAMES.applicationNumber
};