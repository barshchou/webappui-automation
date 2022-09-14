import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/rent_reconciliation/QA-5304_06-08.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income, ReviewExport } from "../../../../../actions";

describe(`Verify the "Lease Terms Adjustment Sub-Total"`, 
    { tags: [ "@income", "@commercial", "@rent_reconciliation", "@check_export" ] }, () => {

        it(`[QA-5304] Verify the "Lease Terms Adjustment Sub-Total" row is displayed in the "Rent Reconciliation" grid
        [QA-5306] Verify the calculations for the "Lease Terms Adjustment Sub-Total" for Calculation = %
        [QA-5307] Verify the calculations for the "Lease Terms Adjustment Sub-Total" for Calculation = $/UnitSF`, 
        () => {
            createReport(testData.reportCreationData);
            cy.stepInfo("Preconditions: Navigate to property summary, enter number of commercial units");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.unitsNumber);

            cy.stepInfo('Preconditions: Fill in Commercial In-Place RR table');
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
            testData.leaseStatuses.forEach((status, index) => {
                Income._CommercialManager.InPlaceRentRoll
                    .chooseLeaseStatusByRowNumber(status, index)
                    .enterRentPerSFMonthlyByRowNumber(testData.rentPSFs[index], index);
            });

            cy.stepInfo(`Preconditions: Add any Comp Group (Income > Commercial > Comp Groups). 
                    Move tenants to created Comp Group (Income > Commercial > Comp Groups)`);
            _NavigationSection.navigateToCommercialCompGroups();
            Income._CommercialManager.CompGroups
                .addCompGroup(testData.compGroupName)
                .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.unitsNumber);
 
            cy.stepInfo('Preconditions: Select any rent comp (Income>Commercial>Rent Comps)');
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.addNumberFirstComparables(testData.numberOfComparables)
                .dragAllCommercialUnitsIntoGroup(testData.compGroupName, testData.numberOfComparables);

            cy.stepInfo('Steps: 1. Navigate to Income → Commercial → Rent Reconciliation');
            _NavigationSection.navigateToRentReconciliation();

            cy.stepInfo(`[QA-5304] 2. Verify that the “Lease Terms Adjustment Sub-Total” row is displayed right under 
                    the “Lease Terms Adjustment” row in the “Rent Reconciliation” grid.`);
            Income._CommercialManager.RentReconciliation.Page.leaseTermsAdjustmentRow
                .next()
                .children()
                .eq(0)
                .should('have.text', 'Lease Terms Adjustment Sub-Total');

            cy.stepInfo(`3. Set Calculation type -> "$/SF".`);
            Income._CommercialManager.RentReconciliation.setLeaseTermsCalculationType(testData.calculationTypeSF);

            cy.stepInfo(`4. Enter any value into the input field of the “Market Conditions Adjustment” 
            row for any added comparable (e.g. 5%)`);
            for (let index = 0; index < testData.numberOfComparables; index++) {
                Income._CommercialManager.RentReconciliation
                    .setLeaseTermsAdjustment(testData.leaseTermsAdjustments[index], testData.calculationTypeSF, index);
            }

            cy.stepInfo(`[QA-5306] 5. Verify that the “Lease Terms Adjustment Sub-Total” is calculated as 
            Rent/SF + Lease Terms Adjustment`);
            for (let index = 0; index < testData.numberOfComparables; index++) {
                Income._CommercialManager.RentReconciliation
                    .verifyLeaseTermsAdjustment(testData.calculationTypeSF, index);
            }

            cy.stepInfo(`6. Set Calculation type -> "%".`);
            Income._CommercialManager.RentReconciliation.setLeaseTermsCalculationType(testData.calculationTypePercent);

            cy.stepInfo(`[QA-5307] 7. Verify the calculations for the “Lease Terms Adjustment Sub-Total” row 
            (Rent/SF + Lease Terms Adjustment)`);
            for (let index = 0; index < testData.numberOfComparables; index++) {
                Income._CommercialManager.RentReconciliation
                    .verifyLeaseTermsAdjustment(testData.calculationTypePercent, index);
            }
            Income._CommercialManager.RentReconciliation.addMarketRentConclusion(testData.numberOfComparables);

            cy.stepInfo("8. Export the report");
            _NavigationSection.Actions.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`[QA-5308] Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);

                    cy.stepInfo(`1. Verify that the “Lease Terms Adjustment Sub-Total” row is displayed in the 
                    exported grid between the “Lease Terms Adjustment” and “Market Conditions (Time)” rows`);
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::tr[td/p[.='Lease Terms Adjustment']][1]`)
                        .next().children().eq(0).scrollIntoView()
                        .should('have.text', 'Lease Terms Adjustment Sub-Total');

                    cy.stepInfo(`2. Verify the order of rows in the exported report matches the following order:
                            - Rent/SF
                            - Lease Terms Adjustment
                            - Lease Terms Adjustment Sub-Total
                            - Market Conditions (Time)
                            - Trended Price/SF`);
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::tr[td/p[.='Lease Terms']][1]`)
                        .next().children().eq(0).scrollIntoView()
                        .should('have.text', 'Rent /SF/Month');
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::tr[td/p[.='Rent /SF/Month']][1]`)
                        .next().children().eq(0).scrollIntoView()
                        .should('have.text', 'Lease Terms Adjustment');
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::tr[td/p[.='Lease Terms Adjustment']][1]`)
                        .next().children().eq(0).scrollIntoView()
                        .should('have.text', 'Lease Terms Adjustment Sub-Total');
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::tr[td/p[.='Lease Terms Adjustment Sub-Total']][1]`)
                        .next().children().eq(0).scrollIntoView().should('have.text', 'Market Conditions (Time)');
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::tr[td/p[.='Market Conditions (Time)']][1]`)
                        .next().children().eq(0).scrollIntoView()
                        .should('have.text', 'Trended Rent/SF/Month');
                });
        });
    });