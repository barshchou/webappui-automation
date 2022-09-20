import testData from 
    "../../../../../fixtures/not_full_reports/income/commercial/rent_reconciliation/QA-5397-98.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income, ReviewExport } from "../../../../../actions";

describe(`Verify "Trended Rent/SF" row in the "Rent Reconciliation Adjustment grid"`, 
    { tags: [ "@income", "@commercial", "@rent_reconciliation", "@check_export" ] }, () => {

        it(`[QA-5397] Verify "Trended Rent/SF" row is displayed in the 
        "Rent Reconciliation Adjustment grid" on "Rent Reconciliation" page`, () => {
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

            cy.stepInfo('1. Navigate to Income → Commercial → Rent Reconciliation');
            _NavigationSection.navigateToRentReconciliation();

            cy.stepInfo(`2. Verify “Trended Rent/SF” row is displayed in the grid between 
                    “Market Conditions Adjustment” row and “Size Adjustments” row.`);
            Income._CommercialManager.RentReconciliation.Page.marketConditionsAdjustmentRow.next().children().eq(0)
                .should('have.text', 'Trended Rent/SF/Month');
            Income._CommercialManager.RentReconciliation.Page.trendedRentPerSfRow.next().children().eq(0)
                .should('have.text', 'Size Adjustments');
        
            cy.stepInfo(`3. Verify that “Trended Rent/SF” field for “Base Unit” column 
            is greyed out and not editable.`); //isContentEditable
            Income._CommercialManager.RentReconciliation.Page.baseUnitTrendedRentSfMonth
                .invoke('prop', 'isContentEditable').should('eq', false);
            Income._CommercialManager.RentReconciliation.Page.baseUnitTrendedRentSfMonth
                .invoke('prop', 'tagName').should('eq', 'TD');
            Income._CommercialManager.RentReconciliation.addMarketRentConclusion(testData.numberOfComparables);

            cy.stepInfo("4. Export the report");
            _NavigationSection.Actions.openReviewAndExport();
            ReviewExport.selectSectionsToIncludeInExport(testData.sectionToExport)
                .generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it(`[QA-5398] Check export`, () => {
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);

                    cy.stepInfo(`1. Verify that nothing is displayed in the "Trended Rent/SF"`);
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::td[p[.='Trended Rent/SF/Month']][1]`)
                        .next().scrollIntoView()
                        .should('have.text', '');

                    cy.stepInfo(`2. Verify that nothing is displayed in the "Adjusted Rent/SF"`);
                    cy.xpath(`//p[.='${testData.compGroupName} Rent Reconciliation Adjustment Grid']` + 
                    `//following::td[p[.='Adjusted Rent/SF/Month']][1]`)
                        .next().scrollIntoView()
                        .should('have.text', '');
                });
        });
    });