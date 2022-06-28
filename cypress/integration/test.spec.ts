import { createReport } from './../actions/base/baseTest.actions';
import NavigationSection from "./../actions/base/navigationSection.actions";
import testData from "./../fixtures/not_full_reports/report/client/QA-4642.fixture";

const featureFlagKey = 'flexible-taxes';
const userId = 'mikita.radzkou@boweryvaluation.com';

describe("Test", () => {
    before(() => {
        expect(Cypress.env('launchDarklyApiAvailable'), 'LaunchDarkly').to.be.true;
        cy.task('cypress-ld-control:setFeatureFlagForUser', {
            featureFlagKey,
            userId,
            variationIndex: 0,
          });
        createReport(testData.reportCreationData);
    });
    
    it('shows the casual greeting', () => {
        NavigationSection.navigateToTaxInfo();
        cy.contains("Add Additional Tax Rate +").should('be.visible');

        cy.task('cypress-ld-control:getFeatureFlag', featureFlagKey)
        .then(console.log)
    // let's print the variations to the Command Log side panel
        .its('variations')
        .then((variations) => {
        variations.forEach((v, k) => {
        cy.log(`${k}: ${v.name} is ${v.value}`);
            });
        });
      });
      
      after(() => {
        cy.task('cypress-ld-control:removeUserTarget', { featureFlagKey, userId });
      });
});
