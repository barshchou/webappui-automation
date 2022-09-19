import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4218.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import Enums from "../../../../../enums/enums";
import { DataCollections, Income } from "../../../../../actions";
import ReportDataCreator from "../../../../../fixtures/data_creator/reportData.creator";
import { _NavigationSection } from "../../../../../actions/base";

describe("Verify the grid is present", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {
        
        const conclusionValues = [ Enums.VALUE_CONCLUSION_TYPE.AS_IS, Enums.VALUE_CONCLUSION_TYPE.AS_STABILIZED,
            Enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE ];

        conclusionValues.forEach(type => {
            const reportCreationData = ReportDataCreator.getReportData("4218", {
                conclusionValue: type
            });

            it(`Test for ${type} type of report`, () => {
                createReport(reportCreationData);
                _NavigationSection.navigateToResInPlaceRentRoll();
                if (reportCreationData.conclusionValue === Enums.VALUE_CONCLUSION_TYPE.AS_IS) {
                    cy.contains(testData.asIsText).should("exist");
                    Income._Residential.InPlaceRentRoll.clickCloseIcon();
                    cy.contains(testData.asIsText).should("not.exist");
                } else {
                    cy.contains(testData.notAsIsText).should("exist");
                    Income._Residential.InPlaceRentRoll.clickCloseIcon();
                    cy.contains(testData.notAsIsText).should("not.exist");
                }
                Income._Residential.InPlaceRentRoll.verifyColumnExist(testData.columnName)
                    .verifyNumberOfUnitsNumberCells();
                _NavigationSection.navigateToSubjectPropertyData();
                DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
                _NavigationSection.navigateToResInPlaceRentRoll();
                Income._Residential.InPlaceRentRoll.verifyNumberOfUnitsNumberCells(testData.numberOfUnits);
            });
        });
    });