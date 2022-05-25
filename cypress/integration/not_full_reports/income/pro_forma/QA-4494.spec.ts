import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4494.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Income, Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
//import enums from "../../../../enums/enums";
import { Tag } from "../../../../utils/tags.utils";

describe("", 
    { tags:[ Tag.income, Tag.pro_forma ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });
//

    it("[QA-4494] Verify table with the following columns: Income, Total, PSF, Per Unit", () => {

        cy.stepInfo("1. Go to Income -> Pro Forma page and verify that the table contains Income, Total, PSF, Per Unit columns");
        _NavigationSection.navigateToProForma();
        Income._ProFormaActions.Page.columnHeaderIncome.should('exist');
        Income._ProFormaActions.Page.columnHeaderTotal.should('exist');
        Income._ProFormaActions.Page.columnHeaderPSF.should('exist');
        Income._ProFormaActions.Page.columnHeaderPerUnit.should('exist');
  //  });

 //   it("[QA-4495] Potential Residential Income >Total [taken from Income>Potential Gross Income -> calculated on Stabilized Rent Roll Summary page] (is rounded)", () => {

        cy.stepInfo("1. Create new report or open the report which is already created. Make sure that there is at least two residential unit.");
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfResUnits(testData.resUnit);
        
        cy.stepInfo("2. Go to Income → Residential → In-Place Rent Roll and fill in all necessary values to the table");
     
        _NavigationSection.navigateToResInPlaceRentRoll()
    
        Income._Residential.InPlaceRentRoll.enterListMonthlyRents(testData.monthlyRent)
 
          _NavigationSection.navigateToProForma();
     
         
      //  deleteReport(testData.reportCreationData.reportNumber);
    });


});