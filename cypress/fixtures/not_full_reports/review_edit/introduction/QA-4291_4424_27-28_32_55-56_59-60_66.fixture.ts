import Enums from "../../../../enums/enums";
import { _FinalTitles, _PropertyTitles, _ReportTitles, _IncomeTitles } from "../../../../enums/pages_titles";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const backLinkNames = {
    identificationOfClient: Enums.INTRODUCTION_TEXTBOX_NAMES.identificationOfTheClient, 
    intendedUser: Enums.INTRODUCTION_TEXTBOX_NAMES.intendedUseAndUser, 
    definitionOfMarketValue: Enums.INTRODUCTION_TEXTBOX_NAMES.definitionOfMarketValue,
    generalAssumptionsDiscussion: Enums.INTRODUCTION_TEXTBOX_NAMES.generalAssumptionsDiscussion,
    recentSalesHistoryDiscussion: Enums.INTRODUCTION_TEXTBOX_NAMES.recentSalesHistoryDiscussion,
    propertyContractHistoryDiscussion: Enums.INTRODUCTION_TEXTBOX_NAMES.propertyContractHistoryDiscussion,
    purposeAndDateOfValue: Enums.INTRODUCTION_TEXTBOX_NAMES.purposeAndDateOfValue,
    exposureTime: Enums.INTRODUCTION_TEXTBOX_NAMES.exposureTime,
    marketingTime: Enums.INTRODUCTION_TEXTBOX_NAMES.marketingTime
};

const textBoxNames = {
    identificationOfClient: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
    intendedUser: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
    definitionOfMarketValue: Enums.PAGES_TEXTBOX_NAMES.definitionOfMarketValue,
    generalAssumptionsDiscussion: Enums.PAGES_TEXTBOX_NAMES.generalAssumptionsDiscussion,
    recentSalesHistoryDiscussion: Enums.PAGES_TEXTBOX_NAMES.recentSalesHistoryDiscussion,
    propertyContractHistoryDiscussion: Enums.PAGES_TEXTBOX_NAMES.propertyContractHistoryDiscussion,
    purposeDateOfValueDiscussion: Enums.PAGES_TEXTBOX_NAMES.purposeAndDateOfValueDiscussion,
    exposureTimeDescription: Enums.PAGES_TEXTBOX_NAMES.exposureTimeDescription,
    marketingTimeDescription: Enums.PAGES_TEXTBOX_NAMES.marketingTimeDescription
};

const backLinkAndPageNames = [
    {
        pageName: _ReportTitles.CLIENT,
        whereTo: backLinkNames.identificationOfClient,  
    },
    {
        pageName: _ReportTitles.CLIENT,
        whereTo: backLinkNames.intendedUser,  
    },
    {
        pageName: _ReportTitles.KEY_INFO,
        whereTo: backLinkNames.definitionOfMarketValue,  
    },
    {
        pageName: _FinalTitles.ASSUMPTIONS_CONDITIONS,
        whereTo: backLinkNames.generalAssumptionsDiscussion,  
    },
    {
        pageName: _PropertyTitles.HISTORY,
        whereTo: backLinkNames.recentSalesHistoryDiscussion,  
    },
    {
        pageName: _PropertyTitles.HISTORY,
        whereTo: backLinkNames.propertyContractHistoryDiscussion,  
    },
    {
        pageName: _IncomeTitles.CAP_RATE_CONCLUSION,
        whereTo: backLinkNames.purposeAndDateOfValue,  
    },
    {
        pageName: _PropertyTitles.MARKET,
        whereTo: backLinkNames.exposureTime,  
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4291_4424_27-28_32_55-56_59-60_66"),
    typeValue: "Test values",
    textBoxNames,
    backLinkNames,
    backLinkAndPageNames,
    marketGoToBackLink: {
        pageName: _PropertyTitles.MARKET,
        whereTo: backLinkNames.marketingTime,  
    }
};