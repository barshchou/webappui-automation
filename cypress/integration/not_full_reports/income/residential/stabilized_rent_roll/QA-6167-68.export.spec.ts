import { Income, Property, ReviewExport } from '../../../../../actions';
import { _NavigationSection } from '../../../../../actions/base';
// eslint-disable-next-line max-len
import testData from "../../../../../fixtures/not_full_reports/income/residential/stabilized_rent_roll/QA-6167-68.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Default selection on Stabilized Rent Roll table is the same selection made on In-Place RR page",
    { tags:[ "@income", "@residential", "@stabilized_rent_roll_summary", "@check_export" ] }, () => {
        it(`[QA-6167] Verify Rent-Controlled and Market Rate Increase values
            [QA-6168] Verify 'Rent Controlled Increases Discussion' generated commentary`, () => {
            cy.stepInfo(`Precondition: Select any option as Basis of Square Foot Analysis 
                        and fill in square foot field with valid numeric value.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.residentialUnits.length);

            cy.stepInfo("Precondition: Go to Income > Residential > In-Place RR");
            _NavigationSection.navigateToResInPlaceRentRoll();

            cy.stepInfo(`Precondition: In the Income > Residential > In-Place Rent Roll page make rent type 
                        of at least one unit as Rent Controlled and at least one - as Market Rate`);
            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterRentTypeCellByRowNumber(unit.rentType, index)
                    .enterMonthlyRentByRowNumber(unit.monthlyRent, index);
            });

            cy.stepInfo(`1. Open Income > Residential > Stabilized Rent Roll Summary page > Summary Data tab`);
            _NavigationSection.navigateToResidentialStabilizedRentRollSummary();

            cy.stepInfo(`2. Verify Rent-Controlled Increase, Market Rate Increase value`);
            testData.residentialUnits.forEach((_, index) => {
                Income._Residential.StabRentRollSummary
                    .verifyRentTypeIncrease(testData.rentTypeIncrease[index], index);
            });

            cy.stepInfo(`[QA-6168] 4. Open Income > Residential > Stabilized Rent Roll Summary page > Discussion tab`);
            Income._Residential.StabRentRollSummary.openDiscussionTab();

            cy.stepInfo(`[QA-6168] 5. Verify 'Rent Controlled Increases Discussion' generated commentary`);
            Income._Residential.StabRentRollSummary
                .verifyRentControlledIncreaseDiscussion(testData.rentControlledDiscussion);

            cy.stepInfo("[QA-6167][QA-6168]. 6. Export the report");
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

                cy.stepInfo(`[QA-6167] 7. Verify export to have market and 
                            controlled rent values and commentaries `);
                cy.xpath(`//p[.='${testData.potentialGrossSection}']//following::td[p[.='Rent Controlled']][1]`)
                    .next().next().next().scrollIntoView().should('have.text', `${testData.rentTypeIncrease[0]}00`);
                cy.xpath(`//p[.='${testData.potentialGrossSection}']//following::td[p[.='Market Rate']][1]`)
                    .next().next().next().scrollIntoView().should('have.text', `${testData.rentTypeIncrease[1]}.00000`);

                cy.stepInfo(`[QA-6168] Verify the paragraph of text under Rent Controlled Increases subheader`);
                cy.xpath(`//h4[.='${testData.rentControlledSection}']`)
                    .next().should('have.text', testData.rentControlledDiscussion);
            });
        });
    });
