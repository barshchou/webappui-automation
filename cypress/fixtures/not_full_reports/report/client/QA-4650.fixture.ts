import ReportDataCreator from "../../../data_creator/reportData.creator";

export default {
    reportCreationData: ReportDataCreator.getDefaultReportData("4650"),
    // generatedCommentary: "Our analyses, opinions and conclusions were developed, and this report has been prepared, " +
    //     "in conformance with the Standards of Professional Practice and Code of Professional Ethics of the Appraisal " +
    //     "Institute, the Uniform Standard of Professional Appraisal Practice (USPAP), [Client Company]'s appraisal " +
    //     "guidelines, and applicable state appraisal regulations. To report the assignment results, we use " +
    //     "the Appraisal Report option of Standards Rule 2-2(a) of USPAP.",
    // newCommentary: "some test commentary"
    clientName: `client-${Cypress._.random(0,1e6)}_QA_4650`,
    clientFileNumber: `clientFileNumber-${Cypress._.random(0,1e6)}_QA_4650`,
};