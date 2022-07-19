import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_reconciliation/QA-5304_06-08.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property, ReviewExport } from "../../../../../actions";

describe(`Verify "Trended Rent/SF" row in the "Rent Reconciliation Adjustment grid"`, 
    { tags: [ "@income", "@commercial", "@rent_reconciliation", "@check_export" ] }, () => {

    it(`[QA-5397] Verify "Trended Rent/SF" row is displayed in the 
        "Rent Reconciliation Adjustment grid" on "Rent Reconciliation" page`, () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Preconditions: Navigate to property summary, enter number of commercial units");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.unitsNumber);

        cy.stepInfo('Preconditions: Fill in Commercial In-Place RR table');
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
        testData.leaseStatuses.forEach((status, index) => {
            Income._CommercialManager.InPlaceRentRoll
                .chooseLeaseStatusByRowNumber(status, index)
                .enterRentPerSFMonthlyByRowNumber(testData.rentPSFs[index], index);
         });
 
        cy.stepInfo('Preconditions: Add any Comp Group (Income > Commercial > Comp Groups)');
        cy.stepInfo('Preconditions: Move tenants to created Comp Group (Income > Commercial > Comp Groups)');
        _NavigationSection.openCompGroupsInCommercial();
        Income._CommercialManager.CompGroups
            .addCompGroup(testData.compGroupName)
            .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.unitsNumber);
 
        cy.stepInfo('Preconditions: Select any rent comp (Income>Commercial>Rent Comps)');
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.addNumberFirstComparables(testData.numberOfComparables)
            .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.numberOfComparables);

        cy.stepInfo('1. Navigate to Income → Commercial → Rent Reconciliation');
        _NavigationSection.navigateToRentReconciliation();

        cy.stepInfo(`2. Verify “Trended Rent/SF” row is displayed in the grid between 
                    “Market Conditions Adjustment” row and “Size Adjustments” row.`);
        
        
        cy.stepInfo('3. Verify that “Trended Rent/SF” field for “Base Unit” column is greyed out and not editable.');


        cy.stepInfo("8. Export the report");
        _NavigationSection.Actions.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it(`[QA-5308] Verify the "Lease Terms Adjustment Sub-Total" row is displayed in the exported report`, () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" })
            .then(file => {
                cy.log(<string>file);
                cy.visit(<string>file);

                cy.stepInfo(`1. Verify that the “Lease Terms Adjustment Sub-Total” row is displayed in the exported grid 
                            between the “Lease Terms Adjustment” and “Market Conditions (Time)” rows`);
                cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']//following::tr[td/p[.='Lease Terms Adjustment']][1]`)
                    .next().children().eq(0).scrollIntoView()
                    .should('have.text', 'Lease Terms Adjustment Sub-Total');

                cy.stepInfo(`2. Verify the order of rows in the exported report matches the following order:
                            - Rent/SF
                            - Lease Terms Adjustment
                            - Lease Terms Adjustment Sub-Total
                            - Market Conditions (Time)
                            - Trended Price/SF`);
                cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']//following::tr[td/p[.='Lease Terms']][1]`)
                    .next().children().eq(0).scrollIntoView().should('have.text', 'Rent /SF/Month');
                cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']//following::tr[td/p[.='Rent /SF/Month']][1]`)
                    .next().children().eq(0).scrollIntoView().should('have.text', 'Lease Terms Adjustment');
                cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']//following::tr[td/p[.='Lease Terms Adjustment']][1]`)
                    .next().children().eq(0).scrollIntoView().should('have.text', 'Lease Terms Adjustment Sub-Total');
                cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']//following::tr[td/p[.='Lease Terms Adjustment Sub-Total']][1]`)
                    .next().children().eq(0).scrollIntoView().should('have.text', 'Market Conditions (Time)');
                cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']//following::tr[td/p[.='Market Conditions (Time)']][1]`)
                    .next().children().eq(0).scrollIntoView().should('have.text', 'Trended Rent/SF/Month');
        });
    });
});