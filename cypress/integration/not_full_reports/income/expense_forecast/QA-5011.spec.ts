import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5011.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import expensesCardsNames from "../../../../../cypress/enums/expenseForecast.enum";


describe(`[QA-5011] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox and tooltip functionality`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
            Income._ExpenseForecastActions.Page.allForecastsInputs.then(inputs => {
                cy.wrap(inputs).parents('[data-qa$=-forecast-item]').find('[label="Include Expense on Pro Forma"]').find('[type="checkbox"]')
                .invoke('prop', 'value').as('val')
        });

     /*   let value 

        expenseForecastPage.allForecastsInputs.then(inputs => {
            cy.wrap(inputs).parents('[data-qa$=-forecast-item]').find('[label="Include Expense on Pro Forma"]').find('[type="checkbox"]')
            .invoke('prop', 'value').then(value => {
                
               // cy.wrap(value).as(`ifChecked`);
    
            });
        
    })*/

it (' asdfasdf', function() { this. cy.log(this.val)  })


        it("[QA-5011]", () => {
            cy.stepInfo(`1. Go to Property > Summary and add residential and commertial units`);
        /*    _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits)
            .enterGrossBuildingArea(testData.buildingDescription.grossArea);*/
            
        //     cy.stepInfo(`2. Go to Income > Residential > In-Place Rent Roll and add rooms to residential units`);
        //     _NavigationSection.navigateToResInPlaceRentRoll();
        //     Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis)
        //     .enterRoomsNumberByRowNumber(testData.residentialUnits.rooms, 0);
       
        _NavigationSection.navigateToExpenseForecast();
        // expensesCardsNames.expenseCardsIDArray.forEach(element => {
        //              Income._ExpenseForecastActions.uncheckIncludeInProFormaCheckbox(element);
        //          });


    /*    testData.expenseForecastFixtureWithUnitArray.forEach(element => {
                    Income._ExpenseForecastActions.enterForecastItemForecast(element);
                 });
                 testData.expenseForecastFixtureWithUnitArray.forEach(element => {
                            Income._ExpenseForecastActions.chooseForecastItemBasis(element);
                        });
                        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));*/
      
                        Income._ExpenseForecastActions.inputRetrive();



                //  Income._ExpenseForecastActions.TotalForecastPSF(
                //      testData.buildingDescription.grossArea, 
                //      testData.numberOfResidentialUnits, 
                //      testData.rentRollresUnitFixture.rooms);


           
        //     cy.stepInfo(`3. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
        //     is NOT displayed in the Pro Forma page> Operating Expenses section and
        //     is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (PSF measure + Empty Appraiser’s forecasts)`);
        //     _NavigationSection.navigateToExpenseForecast();
        //     expensesCardsNames.expenseCardsIDArray.forEach(element => {
        //         Income._ExpenseForecastActions.uncheckIncludeInProFormaCheckbox(element);
        //     });
        //     _NavigationSection.navigateToProForma();
        //     testData.expensesInProFormaByDefaultArray.forEach(element => {
        //         Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
        //     });
        //     _NavigationSection.navigateToExpenseForecast();
        //     Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
        //     .verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

        //     cy.stepInfo(`3. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
        //     is NOT displayed in the Pro Forma page> Operating Expenses section and
        //     is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (Per Unit measure + Empty Appraiser’s forecasts)`);
           
        //     testData.expenseForecastFixtureWithUnitArray.forEach(element => {
        //         Income._ExpenseForecastActions.chooseForecastItemBasis(element);
        //     });
        //     _NavigationSection.navigateToProForma();
        //     testData.expensesInProFormaByDefaultArray.forEach(element => {
        //         Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
        //     });
        //     _NavigationSection.navigateToExpenseForecast();
        //     Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
        //     .verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

        //     cy.stepInfo(`4. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
        //     is NOT displayed in the Pro Forma page> Operating Expenses section and
        //     is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (Per Room measure for Fuel + Empty Appraiser’s forecasts)`);
        //         Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
        //     _NavigationSection.navigateToProForma();
        //     testData.expensesInProFormaByDefaultArray.forEach(element => {
        //         Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
        //     });
        //     _NavigationSection.navigateToExpenseForecast();
        //     Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
        //     .verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

        //     cy.stepInfo(`5. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
        //     is NOT displayed in the Pro Forma page> Operating Expenses section and
        //     is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (Per Unit measure + Full Appraiser’s forecasts)`);
        //     testData.expenseForecastFixtureWithUnitArray.forEach(element => {
        //         Income._ExpenseForecastActions.enterForecastItemForecast(element);
        //     });
        //     _NavigationSection.navigateToProForma();
        //     testData.expensesInProFormaByDefaultArray.forEach(element => {
        //         Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
        //     });
        //     _NavigationSection.navigateToExpenseForecast();
        //     Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
        //     .verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

        //     cy.stepInfo(`6. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
        //     is NOT displayed in the Pro Forma page> Operating Expenses section and
        //     is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (PSF measure + Full Appraiser’s forecasts)`);
        //     testData.expenseForecastFixtureWithPSFArray.forEach(element => {
        //         Income._ExpenseForecastActions.chooseForecastItemBasis(element);
        //     });
        //     _NavigationSection.navigateToProForma();
        //     testData.expensesInProFormaByDefaultArray.forEach(element => {
        //         Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
        //     });
        //     _NavigationSection.navigateToExpenseForecast();
        //     Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
        //     .verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));

        //     cy.stepInfo(`7. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
        //     is NOT displayed in the Pro Forma page> Operating Expenses section and
        //     is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (Per Room measure for Fuel + Full Appraiser’s forecasts)`);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('room'));
        //     _NavigationSection.navigateToProForma();
        //     testData.expensesInProFormaByDefaultArray.forEach(element => {
        //         Income._ProFormaActions.Page.categoryCellTotal(element).should('not.exist');
        //     });
        //     _NavigationSection.navigateToExpenseForecast();
        //     Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('unit'))
        //     .verifyTOECommentary(testData.commentaries.generated);
        //     Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPerUnitnotIncluded);
        //     Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastTotalFixture('sf'));
        });


        


        
      //  it("[QA-5012]", () => {
            // cy.stepInfo(`1. Verify If “Include Expense on Pro Forma”  checkbox is unselected but there is 
            // data left in the forecast, this data is not included in calculations on Pro forma and Expense forecast page (PSF measure)`);



            //  cy.stepInfo(`8. Verify if “Include Expense on Pro Forma” is unselected -> this  expense category 
            // // is NOT displayed in the Expense Forecast page>Total operating expenses card and generated comment (PSF measure + Full Appraiser’s forecasts)`);
            //  _NavigationSection.navigateToExpenseForecast();
            //  Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastFuelFixture('sf'));
            //  Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaries.generated);
            //  Income._ExpenseForecastActions.Page.toeAppraisersForecastValueLine.should('contain', testData.forecastPSFnotIncluded)
            // testData.array1.forEach(element => {
            //     Income._ExpenseForecastActions.enterForecastItemForecast(element);
            // });

            // cy.stepInfo(`3. Verify  “Include Expense on Pro Forma” checkbox is NOT displayed under custom expense card`);
            // Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name);
            
    //    });

      

        // it("[QA-5010]", () => {
        //     cy.stepInfo(``);
        //     deleteReport(testData.reportCreationData.reportNumber);
        // });
    });