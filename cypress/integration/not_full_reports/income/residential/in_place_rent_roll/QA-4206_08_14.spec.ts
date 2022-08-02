import testData from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4206_08_14.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import { reportCreationData } from 
    "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4206_08_14.fixture";

describe("[QA-4206_08_14] Verify the Developer's Forecast checkbox on the In-Place Rent Roll page", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        testData.conclusionValues.forEach(value => {
            it(`${value} test`, () => {
                cy.stepInfo("1. Login, create report");
                createReport(reportCreationData(value));
        
                cy.stepInfo("2. Navigate to Income < Residential < In-Place Rent Roll");
                NavigationSection.navigateToResInPlaceRentRoll();
        
                cy.stepInfo("3. Verify Element Exist and Check / Uncheck them");
                Income.Residential.InPlaceRentRoll.verifyColumnNotExist(testData.column.devForecast)
                    .verifyColumnNotExist(testData.column.perRoom)
                    .verifyColumnNotExist(testData.column.bathrooms)
                    .verifyColumnNotExist(testData.column.outSpace)
                    .verifyColumnNotExist(testData.column.unitType)
                    .checkUncheckCheckboxForColumn(testData.column.devForecast, testData.label.devForecast)
                    .checkUncheckCheckboxForColumn(testData.column.perRoom, testData.label.perRoom)
                    .checkUncheckCheckboxForColumn(testData.column.bathrooms, testData.label.bathrooms)
                    .checkUncheckCheckboxForColumn(testData.column.outSpace, testData.label.outSpace)
                    .checkUncheckCheckboxForColumn(testData.column.unitType, testData.label.unitType);
            });
        });
    });