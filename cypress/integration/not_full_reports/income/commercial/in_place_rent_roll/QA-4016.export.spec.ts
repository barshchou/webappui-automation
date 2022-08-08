import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4016.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { ReviewExport, Income, Property } from "../../../../../actions";

describe("Verify that changes are displayed for Annual and Monthly Rent columns, # column in the export.", 
    { tags:[ "@income", "@commercial", "@in_place_rent_roll", "@check_export" ] }, () => {

        it("Test body", () => {
            createReport(testData.reportCreationData);

            cy.stepInfo(`1. Navigate to Property -> Commercial Units 
                    and fill in Square Footage for commercial unit`);
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterUnitSFByUnitIndex(testData.squareFootage);

            cy.stepInfo(`2. Navigate to Income -> Commercial -> In-Place Rent Roll 
                    and fill in all necessary data`);
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll
                .clickAnnuallyBasisButton()
                .chooseLeaseStatusByRowNumber(testData.leaseStatus)
                .enterTenantNameByRowNumber(testData.tenantName)
                .enterAnnualRentByRowNumber(testData.annualRent);
            testData.leaseDates.forEach((leaseDate) => {
                Income._CommercialManager.InPlaceRentRoll.enterLeaseDateByRowNumber(
                    leaseDate.name,
                    leaseDate.value
                );
            });

            cy.stepInfo("3. Export the report");
            _NavigationSection.Actions.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
            
                cy.visit(<string>file);
                cy.xpath("//h4[.='Current Commercial Rent Roll']/following-sibling::table")
                    .eq(0).scrollIntoView().within(() => {
                        cy.stepInfo("Check that the leading # column removed");
                        cy.get("td>p").eq(0).should("not.contain.text", "#");
                        
                        cy.stepInfo("Check that Annual Rent represents a whole number");
                        cy.get("tr").eq(1).find("p").eq(6).should("have.text", `$${testData.annualRent}`);

                        cy.stepInfo("Check that Monthly Rent represents a whole number");
                        cy.get("tr").eq(1).find("p").eq(7).should("have.text", `$${testData.monthlyRent}`);

                        cy.stepInfo(`Verify that Totals text at the bottom of 
                                the new first column is displayed`);
                        cy.get("tr").eq(2).find("p").eq(0).should("have.text", "Totals");
                    });
            });
        });
    });