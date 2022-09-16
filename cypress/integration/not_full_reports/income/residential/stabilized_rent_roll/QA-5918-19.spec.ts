import { Income, DataCollections } from '../../../../../actions';
import { _NavigationSection } from '../../../../../actions/base';
// eslint-disable-next-line max-len
import testData from '../../../../../fixtures/not_full_reports/income/residential/stabilized_rent_roll/QA-5918-19.fixture';
import { createReport } from "../../../../../actions/base/baseTest.actions";
import enums from '../../../../../enums/enums';

describe("Default selection on Stabilized Rent Roll table is the same selection made on In-Place RR page",
    { tags:[ "@income", "@residential", "@stabilized_rent_roll_summary" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach('Restore local storage', () => {
            cy.restoreLocalStorage();
        });

        it(`[QA-5918] Residential Unit Distribution Summary is generated according to selected 
            Basis for Square Foot Analysis if Per Unit Square Footage is unknown`, () => {
            testData.squareFootAnalysisFixture.forEach((_, index) => {
                cy.stepInfo(`Precondition: Select any option as Basis of Square Foot Analysis 
                            and fill in square foot field with valid numeric value.
                            1. Make sure there is at least one residential unit`);
                _NavigationSection.navigateToSubjectPropertyData();
                DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length)
                    .selectBasisSquareFootAnalysis(testData.squareFootAnalysisFixture[index].basis);
                if (testData.squareFootAnalysisFixture[index].basis !== 
                    enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                    DataCollections._SubjectPropertyData
                        .fillBasisSquareFootAnalysis(testData.squareFootAnalysisFixture[index].area);
                }

                cy.stepInfo("2. Go to Income > Residential > In-Place RR");
                _NavigationSection.navigateToResInPlaceRentRoll();

                cy.stepInfo("3. Make sure the radio button to “Do you know per unit square footage?” is No");
                Income._Residential.InPlaceRentRoll.verifyPerUnitSFRadioCheck(false, true);

                cy.stepInfo(`4. Go to Income > Residential > Stabilized Rent Roll Summary > 
                            Discussion tab > Residential Unit Distribution Summary comment`);
                _NavigationSection.navigateToResidentialStabilizedRentRollSummary();
                Income._Residential.StabRentRollSummary.openDiscussionTab();

                cy.stepInfo(`5. Verify comment is generated correctly based on selected 
                            Basis for Square Foot Analysis and template`);
                Income._Residential.StabRentRollSummary
                    .verifyDistributionSummary(
                        testData.squareFootAnalysisFixture[index].distributionSummaryNoSquareFootage);
            });
        });

        it(`[QA-5919] Residential Unit Distribution Summary is generated according to selected Basis for Square 
            Foot Analysis if Per Unit Square Footage is known`, () => {
            testData.squareFootAnalysisFixture.forEach((_, index) => {
                cy.stepInfo(`Precondition: Select any option as Basis of Square Foot Analysis 
                            and fill in square foot field with valid numeric value.
                            1. Make sure there is at least one residential unit`);
                _NavigationSection.navigateToSubjectPropertyData();
                DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.residentialUnits.length)
                    .selectBasisSquareFootAnalysis(testData.squareFootAnalysisFixture[index].basis);
                if (testData.squareFootAnalysisFixture[index].basis !== 
                    enums.BASIS_SQUARE_FOOT_ANALYSIS.grossBuildingArea) {
                    DataCollections._SubjectPropertyData
                        .fillBasisSquareFootAnalysis(testData.squareFootAnalysisFixture[index].area);
                }

                cy.stepInfo("2. Go to Income > Residential > In-Place RR");
                _NavigationSection.navigateToResInPlaceRentRoll();

                cy.stepInfo("3. Make sure the radio button to “Do you know per unit square footage?” is Yes");
                Income._Residential.InPlaceRentRoll.checkPerUnitSquareFootage(true)
                    .verifyPerUnitSFRadioCheck(true, true);

                cy.stepInfo(`4. Go to Income > Residential > Stabilized Rent Roll Summary > 
                            Discussion tab > Residential Unit Distribution Summary comment`);
                _NavigationSection.navigateToResidentialStabilizedRentRollSummary();
                Income._Residential.StabRentRollSummary.openDiscussionTab();

                cy.stepInfo(`5. Verify comment is generated correctly based on selected 
                            Basis for Square Foot Analysis and template`);
                Income._Residential.StabRentRollSummary
                    .verifyDistributionSummary(
                        testData.squareFootAnalysisFixture[index].distributionSummaryYesSquareFootage);
            });
        });
    });
