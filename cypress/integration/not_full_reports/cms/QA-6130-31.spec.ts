import { loginAction } from '../../../actions/base/baseTest.actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-6130-31.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';
import { _CmsTitle } from '../../../enums/pages_titles';

conditionalDescribe("Verify navigation to CMS page and common elements on the page", 
    { tags:[ "@cms", "@feature_flag" ] }, () => {
        it(`[QA-6130][QA-6131] Verify icon and hover behavior in the sidebar. 
                Verify navigation to the CMS page`, () => {
            cy.stepInfo(`1. Make sure that this feature flag is ON: cms-navigation`);
            loginAction(testData.webContentEditorUsername, testData.webContentEditorPassword);

            cy.stepInfo(`2. Verify that CMS icon in the sidebar`);
            _NavigationSection.Page.contentManagementSystemButton.should('exist');
            _NavigationSection.verifyCmsIconTooltip();
                
            cy.stepInfo(`3. Click on the CMS icon and verify Content Management System page is opened`);
            _NavigationSection.navigateToContentManagementSystem();

            cy.stepInfo(`4. Verify page with the following structure is opened:
                        - 'Content Management System' header above the nav
                        - Globe icon on the far left
                        - 'Global' sub-header in the nav
                        - The bottom panel is removed except the profile photo in the sidebar`);
            _CmsBaseActions.Page.Header.should("exist")
                .and("contain.text", _CmsTitle.CONTENT_MANAGEMENT_SYSTEM);
            _CmsBaseActions.verifyCmsSubHeaderDisplayed()
                .verifyGlobalIconDisplayed();
            _NavigationSection.verifyGlobalIconTooltip();
            _NavigationSection.verifyBottomPanelButtonsRemoved();
            _NavigationSection.Page.profileOrganization.should('exist');
        });
    });