import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4303.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import Sales from "../../../../actions/sales/sales.manager";

describe(`Prospective Market Value As Stabilized -> Less Parking Rent Loss data is pulled from Cap Rate Conclusion`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        it(`[QA-4303]`, () => {
            cy.stepInfo(`1. Login, create report. Add residential units.`);
            createReport(testData.reportCreationData);

            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);

            cy.stepInfo(`2. Go to Property → Amenities page and check Parking Units check-box 
                        and put in the number of Parking Units`);
            NavigationSection.navigateToPropertyAmenities();
            Property.Amenities.addParkingPlaces(testData.parkingPlaces);

            cy.stepInfo(`3. Fill in data on the Income → Residential → In-Place Rent Roll page. Click Save button.`);
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.bedrooms)
                .enterRentTypeCellByRowNumber(testData.rentType)
                .enterLeaseStatusByRowNumber(testData.leaseStatus);

            cy.stepInfo(`4. Fill in the values in the Income → Miscellaneous → Parking`);
            NavigationSection.navigateToParking();
            Income.Miscellaneous.Parking.addMonthlyRents(testData.monthlyRents)
                .addParkingVCLossPercentage(testData.parkingVcLossTypeRadio, testData.parkingVCLoss);

            cy.stepInfo(`5. Fill in the value in the Cap Rate Conclusion → Appraiser's Conclusion field`);
            NavigationSection.navigateToCapRateConclusion();
            Income.CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate);

            cy.stepInfo(`6. Input the number of months in the Cap Rate Conclusion Summary Table → 
                        Less Parking Rent Loss raw → Time Period column. Click Save button.`);
            Income.CapRateConclusion.enterMiscellaneousLossMonths(testData.lossMonths, 
                testData.valueConclusionKeyAsStabilized, testData.rentLossTypeParking)
                .enterMiscellaneousLossMonths(testData.lossMonths, testData.valueConclusionKeyAsComplete, 
                    testData.rentLossTypeParking);

            cy.stepInfo(`7. Go to Sales → Value Conclusion page → Sales Value Conclusion Table → 
                        Less Parking Rent Loss raw and compare the values from Time Period and Amount columns 
                        with the Time Period and Amount values from Income → Cap Rate Conclusion page → 
                        Cap Rate Conclusion Summary Table → Less Parking Rent Loss raw`);
            NavigationSection.navigateToSalesValueConclusion();
            Sales.ValueConclusion.verifyMiscellaneousLossMonths(testData.lossMonths, 
                testData.valueConclusionKeyAsStabilized, testData.rentLossTypeParking)
                .verifyMiscellaneousLossMonths(testData.lossMonths, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeParking);

            cy._mapGet(testData.valueConclusionKeyAsStabilized + testData.rentLossTypeParking)
                .then(parkingLoss => {
                    Sales.ValueConclusion.verifyMiscellaneousLossAmount(parkingLoss, 
                        testData.valueConclusionKeyAsStabilized, testData.rentLossTypeParking);
                });
            cy._mapGet(testData.valueConclusionKeyAsComplete + testData.rentLossTypeParking)
                .then(parkingLoss => {
                    Sales.ValueConclusion.verifyMiscellaneousLossAmount(parkingLoss, 
                        testData.valueConclusionKeyAsComplete, testData.rentLossTypeParking);
                });
        });
    });