import Enums from "../../../enums/enums";
import ReportDataCreator from "../../data_creator/reportData.creator";

const reportCreationFixture = () => {
    return ReportDataCreator.getReportData('5381', {
        incomeValue: Enums.INCOME_TYPE.both
    });
};

const _certificationTextsFixture = () => {
    return [
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification1,
            languages: 
                "The statements of fact contained in this report are true and correct."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification2,
            languages: 
                "The reported analyses, opinions, and conclusions are limited only by the reported assumptions " + 
                "and limiting conditions and are our personal, impartial, and unbiased professional analyses, " + 
                "opinions, and conclusions."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification3,
            languages: 
                "We have no present or prospective interest in the property that is the subject of this report " + 
                "and no personal interest with respect to the parties involved."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification4,
            languages: 
                "We have performed no services, as an appraiser or in any other capacity, regarding the property " + 
                "that is the subject of this report within the three-year period immediately preceding " + 
                "the agreement to perform this assignment."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification5,
            languages: 
                "We have no bias with respect to the property that is the subject of this report or to the " + 
                "parties involved with this assignment."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification6,
            languages: 
                "Our engagement in this assignment was not contingent upon developing or " + 
                "reporting predetermined results."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification7,
            languages: 
                "Our compensation for completing this assignment is not contingent upon the development or " + 
                "reporting of a predetermined value or direction in value that favors the cause of the client, " + 
                "the amount of the value opinion, the attainment of a stipulated result, or the occurrence of a " + 
                "subsequent event directly related to the intended use of this appraisal."
        },
        {
            sectionName: Enums.CERTIFICATION_SECTIONS.certification8,
            languages: 
                "Our analyses, opinions, and conclusions were developed, and this report has been prepared, in " + 
                "conformity with the requirements of the Code of Professional Ethics and Standard of Professional " + 
                "Practice of the Appraisal Institute, the Uniform Standards of Professional Appraisal Practice, " + 
                "and applicable state appraisal regulations."
        },
    ];
};

const _textsArray = () => {
    let array = []; 
    _certificationTextsFixture().forEach(section => {
        array.push(section.languages);
    });

    return array;
};

export default {
    reportCreationData: reportCreationFixture(),
    certificationTextsFixture: _certificationTextsFixture(),
    cmsNavigationFlagKey: Enums.FEATURE_FLAG_KEYS.cmsNavigation,
    reportTextEditorFlagKey: Enums.FEATURE_FLAG_KEYS.reportTextEdit,
    swotAnalysisFlagKey: Enums.FEATURE_FLAG_KEYS.swotAnalysis,
    featureFlagEnable: 0,
    textsArray: _textsArray(),
    exportSection: Enums.EXPORT_TITLES.certification,
    sectionToExport: [ Enums.SECTIONS_TO_INCLUDE_IN_EXPORT.certificationSection ]
};