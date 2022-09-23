import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4756-58.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import proFormaKeys from '../../../../utils/mapKeys/income/pro_forma/proFormaKeys';

describe("Pro Forma Page validation Operating Expenses -> Real Estate Taxes", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Go to the Income → Tax Info → Tax Information → Current page 
            and fill in all necessary values`); 
            _NavigationSection.navigateToTaxInfo();
            Income._TaxInfo.switchIncludeTransitionalCheckbox(false)
                .enterTaxableAssessedLandValue(testData.landTaxAssessedValue)
                .enterTaxableAssessedBuildingValue(testData.buildingTaxAssessedValue)
                .saveTaxRate()
                .clickSaveButton();
            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4756]", () => {
            cy.stepInfo(`3. The value in the Real Estate Taxes is taken from 
                    Income → Tax Info → Tax Information → Summary → Tax Liability (Total) cell`);
            Income._ProFormaActions.calculateAndSaveTotalRealEstateTax(
                testData.landTaxAssessedValue, 
                testData.buildingTaxAssessedValue);
            cy._mapGet(proFormaKeys.totalRealEstateTax).then((totalRealEstateTax) => {
                Income._ProFormaActions.verifyCategoryTotal(
                    `$${numberWithCommas(totalRealEstateTax)}`, 
                    proFormaTypes.realEstateTaxes);
            });
        });

        it("[QA-4757]", () => {
            cy.stepInfo(`3. The value in the Real Estate Taxes → PSF is calculated 
                    by the formula: Total / GBA or is taken from Income → Tax Info → 
                    Tax Information → Summary → Tax Liability (PSF) cell`);
            
            Income._ProFormaActions.calculateAndSaveTotalRealEstateTaxPerSf(testData.grossBuildingArea);
            cy._mapGet(proFormaKeys.totalRealEstateTaxPerSf).then((totalRealEstateTaxPerSf) => {
                Income._ProFormaActions.verifyCategoryPSFTotal(
                    `$${numberWithCommas(totalRealEstateTaxPerSf.toFixed(2))}`, 
                    proFormaTypes.realEstateTaxes);
            });
        });

        it("[QA-4758]", () => {
            cy.stepInfo(`3. The value in the Real Estate Taxes → Per Unit is calculated 
                    by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.calculateAndSaveTotalRealEstateTaxPerUnit(testData.numberOfResidentialUnits);
            cy._mapGet(proFormaKeys.totalRealEstateTaxPerUnit).then((totalRealEstateTaxPerUnit) => {
                Income._ProFormaActions.verifyCategoryPerUnitTotal(
                    `$${numberWithCommas(totalRealEstateTaxPerUnit)}`, 
                    proFormaTypes.realEstateTaxes);
            });
        });
    });