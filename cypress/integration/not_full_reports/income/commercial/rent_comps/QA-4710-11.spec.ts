import { Income, DataCollections } from '../../../../../actions';
import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4710-11.fixture";
import { _NavigationSection } from "../../../../../actions/base";
import { createReport } from "../../../../../actions/base/baseTest.actions";

describe("Dropdown 'Filters' - 'Sort by' section display and count values", 
    { tags:[ "@income", "@commercial", "@rent_comps" ] }, () => {

        beforeEach("Login, create report and add Commercial units", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.commercialUnits);
        });

        it("Test body", () => {
            cy.stepInfo("1. Go to Income>Commercial >In-Place Rent Roll and Select “Per Square Foot Per Month” tab");
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.clickPerSquareFootPerMonthButton();
            testData.leaseStatuses.forEach((status, index) => {
                Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber(status, index);
            });

            cy.stepInfo("2. Go to Income > Residential > Rent Comps, add comp and click edit");
            _NavigationSection.navigateToCommercialRentComps();
            Income._CommercialManager.RentComps.openMap()
                .verifyProgressBarNotExist()
                .verifyFiltersDropdownExist()
                .addCompFromMapByAddress(testData.compAddress);

            cy.stepInfo(`3. Select Per Square Foot Per Month and Per Square Foot Per Year radio button on 
                Commercial Unit Details modal and fill valid values`);
            testData.perSquareAndPerMonth.forEach((value, index) => {
                testData.perSquareAndPerMonth[index].values.forEach(value => {
                    Income._CommercialManager.RentComps.clickEditButtonByRowNumber()
                        .checkUnitOfMeasureRadioButton(testData.radioButtonNames[index])
                        .fillInRentCompFieldInput(testData.perSquareAndPerMonth[index].name, value, true)
                        .chooseRentCompFieldDropdownOption(testData.sourceValue.name, testData.sourceValue.value)
                        .clickSubmitButton();

                    if (index === 0) {
                        Income._CommercialManager.RentComps.verifyRentPerMonthCellValue(value);
                    } else {
                        Income._CommercialManager.RentComps.verifyRentPerMonthCellPSFValue();
                    }
                });
            });

            cy.stepInfo(`4. Select Monthly and Annually radio button on 
                Commercial Unit Details modal and fill valid values`);
            testData.monthlyAnnually.forEach((value, index) => {
                Income._CommercialManager.RentComps.clickEditButtonByRowNumber()
                    .checkUnitOfMeasureRadioButton(testData.radioButtonNames[index + 2])
                    .fillInRentCompFieldInput(value.baseRent, value.baseRentValues[index], true)
                    .fillInRentCompFieldInput(value.sf, value.baseRentValues[index], true)
                    .chooseRentCompFieldDropdownOption(testData.sourceValue.name, testData.sourceValue.value)
                    .clickSubmitButton();

                if (index === 0) {
                    Income._CommercialManager.RentComps.verifyRentPerMonthCellMonthlyOrAnnuallyValue(
                        testData.radioButtonNames[2]);
                } else {
                    Income._CommercialManager.RentComps.verifyRentPerMonthCellMonthlyOrAnnuallyValue(
                        testData.radioButtonNames[3]);
                }
            });
        });
    });