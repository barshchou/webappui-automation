import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4608.fixture";
import { createReport, deleteReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, Property, ReviewExport } from "../../../../../actions";
import { numberWithCommas } from "../../../../../../utils/numbers.utils";

describe("Verify the Commercial Stabilized Rent Roll table on export", 
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll", "@check_export" ] }, () => {
        
    it("Test body", () => {
        cy.stepInfo(`1. The mixed report is created and several commercial units are added`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

        cy.stepInfo(`2. On the Property Commercial Unit, the Commercial Unit # SF is filled by any value`); 
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.enterListUnitSF(
            testData.listOfUnitsSF,
            testData.numberOfCommercialUnits
        );
        Property._CommercialUnits.clickRadioButtonByValueAndUnitIndex(
            testData.commercialUnitGroup,
            testData.commercialUnitGroupValue
        );

        cy.stepInfo(`3. On the Income > Commercial > In-Place Rent Roll, the “Vacant“ value is selected 
                    in the Lease Status column for all commercial units (and some other data)`); 
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
            .enterTenantNameByRowNumber(testData.tenantName, 1)
            .enterRentPerSFAnnuallyByRowNumber(testData.rentPSF, 1);
        testData.leaseDates.forEach(date => {
            Income._CommercialManager.InPlaceRentRoll.enterLeaseDateByRowNumber(
                date.name,
                date.value, 1
            );
        });

        cy.stepInfo(`4. On the Income > Commercial > Comp Groups, a new Comp Group has been created with added Comps`); 
        _NavigationSection.clickCommercialCompGroups()
            .clickYesIfExist();
        Income._CommercialManager.CompGroups.addCompGroup(testData.compGroup)
            .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.numberOfCommercialUnits);

        cy.stepInfo(`5. On the Income > Commercial > Rent Comps, several comps have been added for 
                    comparison into a new Created Group from the previous step`);
        _NavigationSection.clickCommercialRentComps()
            .clickYesIfExist();
        Income._CommercialManager.RentComps.clickManuallyAddANewCompButton()
            .searchNewCompByAddress(testData.address);
        testData.rentCompFields.forEach(field => {
            if(field.type == "input") {
                Income._CommercialManager.RentComps.fillInRentCompFieldInput(field.name, field.value, true);
            } else {
                Income._CommercialManager.RentComps.chooseRentCompFieldDropdownOption(field.name, field.value);
            }
        });
        Income._CommercialManager.RentComps.enterLeaseDate(testData.leaseDate)
            .clickSubmitButton()
            .dragAllCommercialUnitsIntoGroup(testData.compGroup, testData.compsAmount);

        cy.stepInfo(`6. On the Income > Commercial > Rent Reconciliation, the Market Rent Conclusion 
                    field is filled with any value`);
        _NavigationSection.clickRentReconciliationButton()
            .clickYesIfExist();
        Income._CommercialManager.RentReconciliation.addMarketRentConclusion(numberWithCommas(testData.marketRentConclusion));
    
        cy.stepInfo(`7. Proceed to the Income > Commercial > Stabilized Rent Roll page.`);
        _NavigationSection.clickCommercialStabRentRollButton()
            .clickYesIfExist();
    
        cy.stepInfo(`8. Click on the Autofill Vacant Units button and verify the Rent PSF column is auto-filled 
                    (Note: Annual and Monthly Rent columns are disabled).`);
        Income._CommercialManager.StabilizedRentRoll.clickAutoFillButton();
        
        cy.stepInfo(`9. Export the report`);
        _NavigationSection.openReviewAndExport();
        ReviewExport.generateDocxReport().waitForReportGenerated()
            .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);

        deleteReport(testData.reportCreationData.reportNumber);
    });

    it("Check export", () => {
        Cypress.config().baseUrl = null;
        cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docx_html: "html" }).then(file => {
            cy.log(<string>file);
            cy.visit(<string>file);
            cy.stepInfo(`10. Proceed to the Income Capitalization Approach > Income Analysis > Commercial Stabilized Rent Roll 
                and verify that the data are exported correctly.`);
            cy.contains("Commercial Stabilized Rent Roll").scrollIntoView()
                .next().next().should('have.text', testData.streetName)
                .next("table").within(() => {
                    for(let i = 0; i < testData.exportData.length; i++) {
                        cy.get("tr").eq(0).find("td").eq(i)
                            .should("have.text", testData.exportData[i].name);
                        cy.get("tr").eq(1).find("td").eq(i)
                            .should("have.text", testData.exportData[i].values[0]);
                        cy.get("tr").eq(2).find("td").eq(i)
                            .should("have.text", testData.exportData[i].values[1]);
                    }
                    cy.get("tr").eq(3).find("td").eq(0).should("have.text", testData.totalRowName);
                    for(let i = 6; i < testData.exportData.length; i++) {
                        cy.get("tr").eq(3).find("td").eq(i)
                            .should("have.text", testData.exportData[i].values[2]);
                    }
                });
        });
    });
});