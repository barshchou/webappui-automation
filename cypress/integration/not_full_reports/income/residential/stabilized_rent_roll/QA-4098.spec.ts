import { Income, DataCollections } from '../../../../../actions';
import { _NavigationSection } from '../../../../../actions/base';
import testData from "../../../../../fixtures/not_full_reports/income/residential/stabilized_rent_roll/QA-4098.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Default selection on Stabilized Rent Roll table is the same selection made on In-Place RR page",
    { tags:[ "@income", "@residential", "@stabilized_rent_roll" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            cy.stepInfo("Precondition: Fill all needed variables");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length);

            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.verifyTotalAnnualRent()
                .checkUncheckPerUnitSquareFootage(testData.columns)
                .checkPerUnitSquareFootage();

            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.enterMonthlyRentByRowNumber(unit.monthlyRent, index)
                    .enterSquareFootageByRow(unit.footage, index)
                    .enterLeaseStatusByRowNumber(unit.leaseStatus, index)
                    .verifyRentPSFValueByRow(false, index);
            });

            cy.stepInfo("1. Navigate to Income > Residential > Stabilized Rent Roll");
            _NavigationSection.navigateToResidentialStabilizedRentRoll();

            testData.residentialUnits.forEach((unit, index) => {
                Income._Residential.InPlaceRentRoll.verifyRentPSFValueByRow(false, index, true);
            });
        });
    });