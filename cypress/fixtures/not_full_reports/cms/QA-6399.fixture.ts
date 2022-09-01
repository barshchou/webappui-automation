import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('6399', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _letterTextsFixture = () => {
    return [
        {
            sectionName: Enums.LETTER_SECTIONS.complianceParagraph,
            language: "This appraisal is also prepared in compliance with Title XI (with amendments) of the " + 
            "Financial Institutions Reform, Recovery and Enforcement Act of 1989 (FIRREA), as well as the " + 
            "Interagency Appraisal and Evaluation Guidelines dated December 2, 2010."
        },
        {
            sectionName: Enums.LETTER_SECTIONS.valuationPrefix,
            language: "After carefully considering all available information and " + 
            "factors affecting value, our opinion is:"
        },
        {
            sectionName: Enums.LETTER_SECTIONS.covidLanguage,
            language: "The global outbreak of the “novel coronavirus,” which has resulted in the COVID-19 " + 
            "pandemic, is presently affecting the US population and economy. The extent and magnitude of the direct " + 
            "or indirect effects of this event on the national and local economy or real estate markets, vary " + 
            "depending upon the geographic location and property type. As the pandemic has progressed, there has " + 
            "been increased clarity regarding the effects through more recent analytical and transactional data, " + 
            "as well as via market participant information and expectations. Our analysis of these and related " + 
            "issues is presented in the attached report. The reader is cautioned and reminded that the conclusions " + 
            "presented in this appraisal report are based on information available as of the effective date(s) of " + 
            "valuation indicated. Although we have made reasonable efforts to estimate the impact, the uncertainty " + 
            "in the real estate and financial markets creates the potential for a more significant change in income " + 
            "and value over a relatively short period of time."
        },
        {
            sectionName: Enums.LETTER_SECTIONS.opinionOfValue,
            language: "The opinion of value expressed herein is subject to the certification, assumptions and " + 
            "limiting conditions, and all other information contained in the following written appraisal report."
        },
        {
            sectionName: Enums.LETTER_SECTIONS.thankYou,
            language: "Thank you for the opportunity to serve you."
        },
    ];
};

export default {
    reportCreationData: reportCreationFixture(),
    letterTextsFixture: _letterTextsFixture(),
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.letterOfTransmittal ]
};