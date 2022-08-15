import { loginAction } from './../../../actions/base/baseTest.actions';
import { _NavigationSection } from '../../../actions/base';
import testData from "../../../fixtures/not_full_reports/cms/QA-5367-70_6303.fixture";
import launchDarklyApi from '../../../api/launchDarkly.api';
import { conditionalDescribe } from "../../checkIsProd.utils";
import { _CmsBaseActions } from '../../../actions/cms';
import { _CmsTitle } from '../../../enums/pages_titles';

conditionalDescribe("Verify that CMS section visibility for users", 
    { tags:[ "@cms", "@feature_flag" ] }, () => {
        testData.userFixture.forEach(user => {
            it(`${user.testCaseId} Verify that CMS section visibility for ${user.role} user`, () => {
                let assertion = user.cmdIsVisible ? 'exist' : 'not.exist';
                let navigationToCms = user.cmdIsVisible ? true : false;

                cy.stepInfo(`1. Make sure that this feature flag is ON: cms-navigation`);
                loginAction(user.username, user.password);

                cy.stepInfo(`2. Verify that CMS icon in the sidebar`);
                _NavigationSection.Page.contentManagementSystemButton.should(assertion);
                
                if (navigationToCms) {
                    cy.stepInfo(`3. Click on the CMS icon and verify Content Management System page is opened`);
                    _NavigationSection.navigateToContentManagementSystem();
                    _CmsBaseActions.Page.Header.should("exist")
                        .and("contain.text", _CmsTitle.CONTENT_MANAGEMENT_SYSTEM);
                }

                cy.stepInfo(`4. Log out`);
                _NavigationSection.logout();
            });
        });
    });