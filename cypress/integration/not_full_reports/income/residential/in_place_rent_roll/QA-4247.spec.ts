import { createReportData } from 
    '../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4247.fixture';
import { DataCollections, Income } from '../../../../../actions';
import { _NavigationSection } from '../../../../../actions/base';
import testData from "../../../../../fixtures/not_full_reports/income/residential/in_place_rent_roll/QA-4247.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Verify the Square Footage column in the grid", 
    { tags:[ "@income", "@residential", "@in_place_rent_roll" ] }, () => {

        it("[QA-4247]", () => {
        
            testData.conclusionValues.forEach((val, index) => {
                cy.stepInfo(`Create Report №${index + 1}`);
                createReport(createReportData(val));

                cy.stepInfo("1. Navigate Income > Residential > In-Place Rent Roll");
                _NavigationSection.navigateToResInPlaceRentRoll();

                cy.stepInfo("2. Check Dev Forecast");
                Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.label);

                cy.stepInfo(`3-${index + 1}. Verify initial comments`);
                if (index === 0) {
                    Income._Residential.InPlaceRentRoll.verifyRentRollCommentary(testData.textCommentaryData[3], true);
                } else {
                    Income._Residential.InPlaceRentRoll.verifyRentRollCommentary(testData.textCommentaryData[4], true);
                }
            });


            cy.stepInfo("4. Add Residential Units");
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToResInPlaceRentRoll();
        
            cy.stepInfo("5. Verify the Tooltip text");
            Income._Residential.InPlaceRentRoll.Page.infoIcon.trigger('mouseover');
            Income._Residential.InPlaceRentRoll.verifyTooltipExist(testData.tooltipText);

            cy.stepInfo("6. Verify generate comments");    
            Income._Residential.InPlaceRentRoll.uncheckCheckboxByLabel(testData.label)
                .enterLeaseStatusByRowNumber(testData.leaseStatusData[0])
                .enterLeaseStatusByRowNumber(testData.leaseStatusData[0], 1)
                .clickSaveButton()
                .verifyProgressBarNotExist()
                .verifyRentRollCommentary(testData.textCommentaryData[0])
                .enterLeaseStatusByRowNumber(testData.leaseStatusData[1])
                .enterLeaseStatusByRowNumber(testData.leaseStatusData[1], 1)
                .clickSaveButton()
                .verifyProgressBarNotExist()
                .verifyRentRollCommentary(testData.textCommentaryData[1])
                .enterLeaseStatusByRowNumber(testData.leaseStatusData[0])
                .enterLeaseStatusByRowNumber(testData.leaseStatusData[1], 1)
                .clickSaveButton()
                .verifyProgressBarNotExist()
                .verifyRentRollCommentary(testData.textCommentaryData[2]);
        });
    });