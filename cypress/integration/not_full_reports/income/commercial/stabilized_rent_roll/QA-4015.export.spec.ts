import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4015.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";
import ReviewExport from "../../../../../actions/reviewExport/reviewExport.actions";
import { isEndsWithDecimal } from "../../../../../utils/html.utils";

describe("Verify the Commercial Stabilized Rent Roll table",
    { tags: [ "@income", "@commercial", "@stabilized_rent_roll", "@check_export" ] }, () => {

        it("Test body", () => {  
            createReport(testData.reportCreationData);
        
            cy.stepInfo(`
        1. Proceed to the Income Approach > Commercial Stabilized Rent Roll and fill all fields on the WebApp.
        `);
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
            NavigationSection.navigateToCommercialUnits();
            Property.CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
            for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
                Property.CommercialUnits.clickCommercialUnitTabByIndex(i)
                    .clickRadioButtonByValueAndUnitIndex(testData.groupName, testData.useRadios[i], i);
            }    
            NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income.Commercial.InPlaceRentRoll
                .chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
                .enterTenantNames(testData.tenantNames, testData.leaseStatuses)
                .verifyTenantNames(testData.tenantNames, testData.leaseStatuses);
            testData.rentsPsf.forEach((rent, index) => {
                if (testData.leaseStatuses[index] !== "Vacant") {
                    Income.Commercial.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
                }
            });
            NavigationSection.navigateToCommercialStabilizedRentRoll()
                .verifyProgressBarNotExist();
            Income.Commercial.StabilizedRentRoll.clickSaveButton()
                .verifyProgressBarNotExist();

            NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport().waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("Check export", () => {
            cy.task("getFilePath",
                { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" }
            ).then(file => {
                cy.log(<string>file);
                cy.stepInfo(`2. Go to the Commercial Stabilized Rent Roll table in the export and check:
                            removed the leading # column; 
                            removed the decimal place for Annual Rent, represent as a whole number;
                            removed the decimal place for Monthly Rent, represent as a whole number.`);
                cy.visit(<string>file);
            
                cy.contains(testData.exportSectionName).prev().scrollIntoView().within(() => {
                    cy.get("tr").eq(0).find("p").eq(0).should("not.have.text", "#");
                    
                    cy.get("tr").eq(1).find("p").eq(0).invoke("attr", "text").then(value => {
                        expect(Number.isInteger(Number.parseInt(value)),
                            "The value in cell is not Number"
                        ).to.be.equal(false);
                    });

                    cy.get("tr").eq(1).find("p").filter(':contains("$0")').then(value => {
                        value.toArray().slice(0, 1).forEach(elem => {
                            expect(
                                (elem.textContent.endsWith(".00")),
                                "Not ends with decimal part"
                            ).to.be.equal(false);
                        });
                    });

                    isEndsWithDecimal(2, (testData.annualRent.replace(".00", "")));
                    isEndsWithDecimal(2, (testData.monthlyRent.replace(".00", "")));
                    isEndsWithDecimal(3, (testData.annualRent.replace(".00", "")));
                    isEndsWithDecimal(3, testData.monthlyRent.replace(".00", ""));

                    cy.stepInfo(`3. Verify that Totals text at the bottom of the new first column are displayed.`);
                    cy.get("tr").last().find("p").filter(':contains("Totals")').should("have.length", 1);
                });
            });
        });
    });
