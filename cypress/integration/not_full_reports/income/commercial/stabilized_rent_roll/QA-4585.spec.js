import testData from "../../../../../fixtures/not_full_reports/income/commercial/stabilized_rent_roll/QA-4585.fixture";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Property from "../../../../../actions/property/property.manager";
import Income from "../../../../../actions/income/income.manager";

describe("Verify the Commercial Stabilized Rent Roll table", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        NavigationSection.navigateToCommercialUnits();
        Property.CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);
        for (let i = 0; i < testData.numberOfCommercialUnits; i++) {
            Property.CommercialUnits.clickCommercialUnitTabByIndex(i)
                .clickRadioButtonByValueAndUnitIndex(testData.useRadios[i], i);
        }
        NavigationSection.navigateToCommercialInPlaceRentRoll();
        Income.Commercial.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, testData.numberOfCommercialUnits)
            .enterTenantNames(testData.tenantNames, testData.leaseStatuses)
            .verifyUseCells(testData.useTexts);
        testData.rentsPsf.forEach((rent, index) => {
            if (testData.leaseStatuses[index] !== "Vacant") {
                Income.Commercial.InPlaceRentRoll.enterAnnualRentPerSFByRowNumber(rent, index);
            }
        });
        NavigationSection.openCommercialStabilizedRentRollInCommercial()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyLeaseStatuses(testData.leaseStatuses)
            .verifyTenantNames(testData.tenantNames, testData.leaseStatuses)
            .verifyUseCells(testData.useTexts)
            .verifySFCells(testData.listOfUnitsSF)
            .verifyAnnualRentByRow(testData.annualRent,1)
            .verifyMonthlyRentByRow(testData.monthlyRent, 1)
            // TODO: Change to 1 index after https://bowery.atlassian.net/browse/WEB-4500 bug fix
            .verifyAnnuallyRentPsf(testData.rentsPsf[1], 0);
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.enterTenantNameByRowNumber(testData.newTenantName, testData.leaseStatuses[1], 1);
        NavigationSection.openCommercialStabilizedRentRollInCommercial()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyTenantNameByRow(testData.newTenantName, testData.leaseStatuses[1], 1);
        NavigationSection.navigateToCommercialInPlaceRentRoll()
            .verifyProgressBarNotExist();
        Income.Commercial.InPlaceRentRoll.deleteTenantNameByRowNumber(1);
        NavigationSection.openCommercialStabilizedRentRollInCommercial()
            .verifyProgressBarNotExist();
        Income.Commercial.StabilizedRentRoll.verifyTenantNameByRow("", testData.leaseStatuses[1],1);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});