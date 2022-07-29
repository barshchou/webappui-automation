import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4291_4424_27-28_32_55"),
    typeValue: "Test values",
    textBoxNames: {
        identificationOfClient: "Identification of the Client",
        intendedUser: "Intended User",
        generalAssumptionsDiscussion: "General Assumptions Discussion",
        recentSalesHistoryDiscussion: "Recent Sales History Discussion",
        propertyContractHistoryDiscussion: "Property Contract History Discussion"
    },
    backLinkNames: [ 
        "Identification of the Client", 
        "Intended Use & User", 
        "Definition of Market Value",
        "General Assumptions Discussion",
        "Property Contract History Discussion" 
    ],
    textBoxTitles: [
        "Identification of the Client", 
        "Intended Use & User", 
        "Definition of Market Value",
        "General Assumptions",
        "Property History",
        "Property Contract History Discussion"
    ]
};