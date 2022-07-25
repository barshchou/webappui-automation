import ReportDataCreator from "../../../data_creator/reportData.creator";
import Enums from "../../../../enums/enums";
import { BoweryReports } from "../../../../types/boweryReports.type";

export default {
    reportCreationData: ReportDataCreator.getReportData("4168", {
        incomeValue: Enums.INCOME_TYPE.both,
        conclusionValue: Enums.VALUE_CONCLUSION_TYPE.AS_IS
    }),
    compAddress: "601 West 26th Street, New York, USA",
    condition: "Shell",
    units:  { grossArea: 25645, numberOfUnits: 2 } as BoweryReports.BuildingDescription,
    saleInfo: {
        saleDate: "05-17-2022",
        buyer: "Test and CO",
        seller: "Test inc"
    },
    verifyTextValue: "$#!@%^1234orem Ipsum is simply dummy text of the printing and typesetting " + 
    "industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an " + 
    "unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived " + 
    "not only five centuries, but also the leap into electronic typesetting, remaining essentially" + 
    "unchanged. It was popularised in the 1960s with the release of Letraset sheets containing " + 
    "Lorem Ipsum passages, and more recently with desktop publishing software " + 
    "like Aldus PageMaker including versions of Lorem Ipsum.`,",
    verifyTextUnderTextArea: "This commentary is for internal use only and will not export"
};