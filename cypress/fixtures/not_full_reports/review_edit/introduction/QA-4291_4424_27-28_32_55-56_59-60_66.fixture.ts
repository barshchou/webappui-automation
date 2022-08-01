import ReportDataCreator from "../../../data_creator/reportData.creator";

const _backLinkNames = {
    identificationOfClient: "Identification of the Client", 
    intendedUser: "Intended Use & User", 
    definitionOfMarketValue: "Definition of Market Value",
    generalAssumptionsDiscussion: "General Assumptions Discussion",
    recentSalesHistoryDiscussion: "Recent Sales History Discussion",
    propertyContractHistoryDiscussion: "Property Contract History Discussion",
    purposeAndDateOfValue: "Purpose & Date of Value",
    exposureTime: "Exposure Time",
    marketingTime: "Marketing Time"
};

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
        exposureTimeDescription: "Exposure Time Description",
        marketingTimeDescription: "Marketing Time Description"
    },
    backLinkNames: _backLinkNames,
    marketGoToBackLink: {
        pageName: "Property Market",
        whereTo: _backLinkNames.marketingTime,  
    },
    backLinkAndPageNames: [
        {
            pageName: "Client",
            whereTo: _backLinkNames.identificationOfClient,  
        },
        {
            pageName: "Client",
            whereTo: _backLinkNames.intendedUser,  
        },
        {
            pageName: "Key Info",
            whereTo: _backLinkNames.definitionOfMarketValue,  
        },
        {
            pageName: "Assumptions/Conditions",
            whereTo: _backLinkNames.generalAssumptionsDiscussion,  
        },
        {
            pageName: "Property History",
            whereTo: _backLinkNames.recentSalesHistoryDiscussion,  
        },
        {
            pageName: "Property History",
            whereTo: _backLinkNames.propertyContractHistoryDiscussion,  
        },
        {
            pageName: "Cap Rate Conclusion",
            whereTo: _backLinkNames.purposeAndDateOfValue,  
        },
        {
            pageName: "Property Market",
            whereTo: _backLinkNames.exposureTime,  
        },
    ]
};