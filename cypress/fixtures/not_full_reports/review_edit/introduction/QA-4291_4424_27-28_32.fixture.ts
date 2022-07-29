import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4291_4424_27-28_32"),
    typeValue: "Test values",
    textBoxNames: {
        identificationOfClient: "Identification of the Client",
        intendedUser: "Intended User",
        generalAssumptionsDiscussion: "General Assumptions Discussion"
    },
    backLinkNames: [ 
        "Identification of the Client", 
        "Intended Use & User", 
        "Definition of Market Value",
        "General Assumptions Discussion" 
    ],
    textBoxTitles: [
        "Identification of the Client", 
        "Intended Use & User", 
        "Definition of Market Value",
        "General Assumptions"
    ]
};