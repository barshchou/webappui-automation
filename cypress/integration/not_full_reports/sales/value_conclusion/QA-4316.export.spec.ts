import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4316.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { DataCollections, Income, Property, Report, ReviewExport, Sales } from '../../../../actions';
import { _saveDataInFile } from "../../../../support/commands";
import { pathSpecData } from "../../../../../utils/fixtures.utils";
import { _NavigationSection } from "../../../../actions/base";

describe(`Prospective Market Value As Stabilized -> Less Other Rent Loss data is pulled from Cap Rate Conclusion`,
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        it(`[QA-4316]`, () => {
            cy.stepInfo(`1. Login, create report. Add residential units.`);
            createReport(testData.reportCreationData);

            cy.stepInfo(`2. Go to Key Info page, fill in the Date of Valuation (As Is) and click Save button`);
            Report._KeyInfo.enterDateByType(testData.valuationDateFixture);

            cy.stepInfo(`3. Go to Property → Summary and set the number of Residential and Commercial Units`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits)
                .enterNumberOfCommercialUnits(testData.commercialUnits);

            cy.stepInfo(`4. Go to Property → Amenities page and check check-boxes for Laundry Room, Storage Units, 
                        Parking and Other. For Storage Units and Parking fill in Number of 
                        Storage Units and Parking Spaces`);
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.checkOtherCheckbox()
                .checkLaundryRoomCheckbox()
                .addStorageUnits(testData.storageUnits)
                .addParkingPlaces(testData.parkingPlaces);

            cy.stepInfo(`5. Go to Income → In-Place Rent Roll page and fill in values into the table`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.bedrooms)
                .enterRentTypeCellByRowNumber(testData.rentType)
                .enterLeaseStatusByRowNumber(testData.leaseStatus)
                .enterMonthlyRentByRowNumber(testData.residentialMonthlyRent);

            cy.stepInfo(`6. Go to Income → Laundry and fill in Laundry Income and Laundry V/C Loss (%) values`);
            _NavigationSection.navigateToLaundry();
            Income._MiscellaneousManager.Laundry.enterLaundryIncome(testData.laundryIncome)
                .enterLaundryVCLossPercentage(testData.vcLossPercentage, testData.vcLossValue);

            cy.stepInfo(`7. Go to Income → Storage and fill in Storage Income and Storage V/C Loss (%) values`);
            _NavigationSection.navigateToStorage();
            Income._MiscellaneousManager.Storage.addStorageIncome(testData.storageIncome)
                .enterStorageVCLossPercentage(testData.storageVCLoss, testData.storageVcLossTypeRadio);

            cy.stepInfo(`8. Go to Income → Parking and fill in values to the Parking Income table and 
                        the value to the Parking Vacancy and Collection Loss Percentage`);
            _NavigationSection.navigateToParking();
            Income._MiscellaneousManager.Parking.addMonthlyRents(testData.monthlyRents)
                .addParkingVCLossPercentage(testData.parkingVcLossTypeRadio, testData.parkingVCLoss);

            cy.stepInfo(`9. Fill in the values in the Income → Miscellaneous → Parking`);
            _NavigationSection.navigateToOther();
            Income._MiscellaneousManager.Other.addOtherIncome(testData.otherIncomeItem);

            cy.stepInfo(`10. Go to Income → Cap Rate Conclusion and fill in the value into Appraiser's 
                        Conclusion field, fill in the values into the Time period and Amount columns 
                        for Lesses, click Save button`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate);
            let rentLossAsStabilizedArray = [];
            let rentLossAsCompleteArray = [];
            testData.miscRentLosses.forEach(rentLoss => {
                Income._CapRateConclusion
                    .enterMiscellaneousLossMonths(testData.lossMonths, testData.valueConclusionKeyAsStabilized, 
                        rentLoss.rentLossType)
                    .enterMiscellaneousLossMonths(testData.lossMonths, testData.valueConclusionKeyAsComplete, 
                        rentLoss.rentLossType);

                cy._mapGet(testData.valueConclusionKeyAsStabilized + rentLoss.rentLossType).then(loss => {
                    let lossValue = loss < 0 
                        ? `($${numberWithCommas(Math.round(loss))})`
                        : `$${numberWithCommas(Math.round(loss))}`;
                    rentLossAsStabilizedArray.push(lossValue);
                });
                cy._mapGet(testData.valueConclusionKeyAsComplete + rentLoss.rentLossType).then(loss => {
                    let lossValue = loss < 0 
                        ? `($${numberWithCommas(Math.round(loss)).replace('-', '')})`
                        : `$${numberWithCommas(Math.round(loss))}`;
                    rentLossAsCompleteArray.push(lossValue);
                });
            });

            // Save rent losses to file to compare against exported report
            _saveDataInFile(rentLossAsStabilizedArray, testData.asStabilizedLossesFileName);
            _saveDataInFile(rentLossAsCompleteArray, testData.asCompleteLossesFileName);

            cy.stepInfo(`11. Go to Sales → Value Conclusion and fill in the value into Sales Value Conclusion Table → 
                        Concluded Value Per SF raw → Amount column`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.enterSaleValueConclusion(testData.concludedValuePerSf);

            cy.stepInfo(`12. Go to Settings&Report, generate report and download it`);
            _NavigationSection.openReviewAndExport();
            ReviewExport.generateDocxReport()
                .waitForReportGenerated()
                .downloadAndConvertDocxReport(testData.reportCreationData.reportNumber);
        });

        it("[QA-4316] Check export", () => {
            cy.stepInfo(`13. In the report go to the Sales Comparison Approach chapter and find the Value Opinion via 
                        the Sales Comparison Approach table. Compare values in the Value Opinion via the Sales 
                        Comparison Approach table with the values in the Sales → Value Conclusion → 
                        Sales Value Conclusion Table`);
            cy.task("getFilePath", { _reportName: testData.reportCreationData.reportNumber, _docxHtml: "html" })
                .then(file => {
                    cy.log(<string>file);
                    cy.visit(<string>file);
                    cy.readFile(`${pathSpecData()}${testData.asStabilizedLossesFileName}`).then(data => {
                        testData.miscRentLosses.forEach((rentLoss, index) => {
                            cy.xpath(`//p[.='Value Opinion via the Sales Comparison Approach']` + 
                            `//following::td[.='${rentLoss.rentLossName} Rent Loss (${testData.lossMonths} months)']` + 
                            `//following-sibling::td[2]`).eq(0)
                                .should('have.text', JSON.parse(data)[index]);
                        });
                    });
                    cy.readFile(`${pathSpecData()}${testData.asCompleteLossesFileName}`).then(data => {
                        testData.miscRentLosses.forEach((rentLoss, index) => {
                            cy.xpath(`//p[.='Value Opinion via the Sales Comparison Approach']` + 
                            `//following::td[.='${rentLoss.rentLossName} Rent Loss (${testData.lossMonths} months)']` + 
                            `//following-sibling::td[2]`).eq(1)
                                .should('have.text', JSON.parse(data)[index]);
                        });
                    });
                });
        });
    });