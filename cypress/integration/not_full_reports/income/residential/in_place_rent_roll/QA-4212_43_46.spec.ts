import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4212_43_46.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { Income, DataCollections } from "../../../../../actions";

describe("[QA-4212] [QA-4243] [QA-4246] In-Place Rent Roll table tests", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo(`Preconditions: Navigate to Income -> Summary and specify amount of units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length);

            cy.stepInfo(`1. [QA-4246] Navigate to Residential -> Verify the Annual Total row is displayed 
            in the grid (not editable, default = 0.00$)`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyTotalAnnualRent();

            cy.stepInfo(`2. [QA-4212] Verify the Do you know per unit square footage? section`);
            Income._Residential.InPlaceRentRoll.checkUncheckPerUnitSquareFootage(testData.columns);
        
            cy.stepInfo(`3. [QA-4243] Verify Rent/SF value with filled monthly rent and square footage values 
            by formula: [Monthly Rent] * 12 / [Square Footage]`);
            Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage();

            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterSquareFootageByRow(unit.footage, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index)
                    .verifyRentPSFValueByRow(false, index);
            });

            cy.stepInfo(`4. [QA-4246] Verify the Annual Total row is calculated per formula = 
            (Monthly Rent ($) sum - vacant units' rent) * 12`);
            Income._Residential.InPlaceRentRoll.verifyTotalAnnualRent();
        });
    });