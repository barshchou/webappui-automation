import { _NavigationSection } from '../../../../actions/base';
import { createReport } from '../../../../actions/base/baseTest.actions';
import { Organization, Report } from '../../../../actions';
import testData from "../../../../fixtures/not_full_reports/report/appraiser/QA-4422.fixture";
import { conditionalDescribe } from '../../../checkIsProd.utils';
import Enums from '../../../../enums/enums';

conditionalDescribe(`Verify that the newly created Lead Appraiser will be sorted alphabetically by the Last 
        name in the Full Name dropdown`, { tags: [ "@report", "@appraiser" ] }, () => {

    beforeEach("Login. Create report", () => {
        cy.stepInfo("Create report");
        createReport(testData.reportData);
    });
            
    it("[QA-4422]", () => {
        cy.stepInfo("1. Navigate to Report -> Appraiser page");
        _NavigationSection.navigateToReportAppraiser();

        cy.stepInfo("2. Proceed to the Organization > Create New User page and add new lead appraiser");
        _NavigationSection.navigateToProfileOrganization(Enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openCreateNewUserPage();
        Organization._CreateNewUser.createNewUser(testData.clientCreationData);

        cy.stepInfo("3. Return to Report -> Appraiser page");
        for (let i = 0; i < 3; i++) {
            cy.go("back");
        }

        cy.stepInfo("4. Get appraisers list and verify Lead Appraisers are sorted alphabetically");
        Report._Appraiser.Page.leadAppraiser.click();
        Report._Appraiser.Page.appraisersList.then(elems => {
            const lastNamesAppraisers = [];
            elems.each((index, elem) => {
                lastNamesAppraisers.push(elem.innerText.split(" ")[1]);
            });
            expect(lastNamesAppraisers).to.deep.eq(lastNamesAppraisers.sort());
        });
        Report._Appraiser.inactivateTextAreaInput();
    });

    afterEach("Delete existing user", () => {
        _NavigationSection.navigateToProfileOrganization(Enums.MENU_LINKS.organization);
        Organization._OrganizationActions.openOrganizationUsersPage();
        Organization._OrganizationUsersActions.deleteUser(testData.userToFind);
    });
});