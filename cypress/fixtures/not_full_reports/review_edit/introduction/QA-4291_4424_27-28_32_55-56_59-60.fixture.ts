import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getReportData("4291_4424_27-28_32_55-56_59-60"),
    typeValue: "Test values",
    textBoxNames: {
        identificationOfClient: "Identification of the Client",
        intendedUser: "Intended User",
        generalAssumptionsDiscussion: "General Assumptions Discussion",
        recentSalesHistoryDiscussion: "Recent Sales History Discussion",
        propertyContractHistoryDiscussion: "Property Contract History Discussion",
        purposeDateOfValueDiscussion: "Purpose & Date of Value Discussion",
        exposureTimeDescription: "Exposure Time Description"
    },
    backLinkNames: [ 
        "Identification of the Client", 
        "Intended Use & User", 
        "Definition of Market Value",
        "General Assumptions Discussion",
        "Property Contract History Discussion",
        "Purpose & Date of Value",
        "Exposure Time" 
    ],
};