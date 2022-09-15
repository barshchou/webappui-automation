import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4498_4500.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/income/incomeTypesCellNames.enum";

describe("Potential [USE(Property -> Commercial Units] Income -> PSF / Per Unit", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least two commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Go to Property → Commercial Units and fill in the values of 
            Leasable Area for all commercial units`); 
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);

            cy.stepInfo(`3. Go to Income → Commercial → In-Place Rent Roll and fill 
            in all necessary values to the table`); 
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, 
                testData.numberOfCommercialUnits);
            testData.rentsPsf.forEach((rent, index) => {
                Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
            });
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();

            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
        });

        it("[QA-4500]", () => {
            cy.stepInfo(`4. Go to Income → Pro Forma page. Verify that value in the
            Potential Commercial Income → Per Unit is calculated by the formula: Total / # of ResidentialUnits`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(testData.perUnitCommercialIncome)}`, 
                proFormaTypes.potentialUndeterminedCommercialIncome);
        });

        it("[QA-4499]", () => {
            cy.stepInfo(`4. Go to Income → Pro Forma page. Verify that value in the 
            Potential Commercial Income → PSF is calculated by the formula: Total / GBA`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.perSfCommercialIncome.toFixed(2))}`,
                proFormaTypes.potentialUndeterminedCommercialIncome);
        });

        it("[QA-4498]", () => {
            cy.stepInfo(`4. Go to Income → Pro Forma page. Verify that value in the 
            Potential Commercial Income → Total is calculated by the formula: Total / GBA`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(testData.total)}`,
                proFormaTypes.potentialUndeterminedCommercialIncome);

            cy.stepInfo(`4.1 Verify that Total is taken from Income → 
            Potential Gross Income → table → Potential Commercial Income`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(Enums.potentialGrossIncome, 
                `$${numberWithCommas(testData.total.toFixed(2))}`);
        });
    });