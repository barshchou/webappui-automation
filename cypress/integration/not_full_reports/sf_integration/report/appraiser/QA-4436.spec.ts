import { _NavigationSection } from '../../../../../actions/base';
import { createReport } from '../../../../../actions/base/baseTest.actions';
import { Report } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/report/appraiser/QA-6126-27.fixture";
import Enums from '../../../../../enums/enums';
import { normalizeText } from '../../../../../../utils/string.utils';

describe("Launch Darkly for Inspector (feature in OFF)",
    { tags:[ "@report", "@appraiser", "@salesforce", "@feature_flag" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4436]", () => {
            
            cy.stepInfo("1. Navigate to Report -> Appraiser page");
            _NavigationSection.navigateToReportAppraiser();

            cy.stepInfo("3. Add External Inspector");
            Report._Appraiser.searchAndAddExternalInspector(testData.inspectorName);
            
            cy.stepInfo(`4. Verify that Bowery Appraiser/Inspector and External Inspector were added to 
                        Appraisers table`);
            Report._Appraiser.verifySignCheckbox(testData.inspectorName, false);

            cy.stepInfo("5. Verify generated Certification Inspection comment");
            Report._Appraiser.Page.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.certificationInspection).invoke('text')
                .then(text => {
                    expect(normalizeText(text)).to.be.eq(testData.certificationInspectionComment);
                });

            cy.stepInfo("6. Verify generated Certification Assistance comment");
            Report._Appraiser.Page.formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.certificationAssistance).invoke("text")
                .then(text => {
                    expect(normalizeText(text)).to.eq(testData.certificationAssistanceComment);
                });
        });
    });