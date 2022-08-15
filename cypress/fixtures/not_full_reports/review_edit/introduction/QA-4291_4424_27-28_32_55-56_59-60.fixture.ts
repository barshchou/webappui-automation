import Enums from "../../../../enums/enums";
import { _FinalTitles, _PropertyTitles, _ReportTitles, _IncomeTitles } from "../../../../enums/pages_titles";
import ReportDataCreator from "../../../data_creator/reportData.creator";

const testsFixture = [
    {
        testName: "[QA-4291-4424]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.identificationOfTheClient,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.identificationOfTheClient,
        pageName: _ReportTitles.CLIENT
    },
    {
        testName: "[QA-4427]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.intendedUser,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.intendedUseAndUser,
        pageName: _ReportTitles.CLIENT
    },
    {
        testName: "[QA-4428]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.definitionOfMarketValue,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.definitionOfMarketValue,
        pageName: _ReportTitles.KEY_INFO
    },
    {
        testName: "[QA-4432]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.generalAssumptionsDiscussion,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.generalAssumptionsDiscussion,
        pageName: _FinalTitles.ASSUMPTIONS_CONDITIONS
    },
    {
        testName: "[QA-4455]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.recentSalesHistoryDiscussion,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.recentSalesHistoryDiscussion,
        pageName: _PropertyTitles.HISTORY
    },
    {
        testName: "[QA-4456]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.propertyContractHistoryDiscussion,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.propertyContractHistoryDiscussion,
        pageName: _PropertyTitles.HISTORY
    },
    {
        testName: "[QA-4459]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.purposeAndDateOfValueDiscussion,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.purposeAndDateOfValue,
        pageName: _IncomeTitles.CAP_RATE_CONCLUSION
    },
    {
        testName: "[QA-4460]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.exposureTimeDescription,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.exposureTime,
        pageName: _PropertyTitles.MARKET,
    },
    {
        testName: "[QA-4466]",
        textBoxName: Enums.PAGES_TEXTBOX_NAMES.marketingTimeDescription,
        backLinkName: Enums.INTRODUCTION_TEXTBOX_NAMES.marketingTime,
        pageName: _PropertyTitles.MARKET,
    },
];

export default {
    reportCreationData: ReportDataCreator.getReportData("4291_4424_27-28_32_55-56_59-60"),
    typeValue: "Test values",
    testsFixture,
};