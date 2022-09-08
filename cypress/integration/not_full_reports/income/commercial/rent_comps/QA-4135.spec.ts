import testData from "../../../../../fixtures/not_full_reports/income/commercial/rent_comps/QA-4135.fixture";
import { createReport } from "../../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../../actions/base";
import { DataCollections, Income } from "../../../../../actions";
import { _IncomeRoutes } from "../../../../../enums/pages_routes";

describe("Subject column calculations", { tags: [ "@income", "@commercial", "@rent_comps" ] }, () => {

    before("Create report", () => {
        createReport(testData.reportCreationData);
        cy.stepInfo("Navigate to property summary, enter number of commercial units");
        _NavigationSection.navigateToSubjectPropertyData();
        DataCollections._SubjectPropertyData.enterNumberOfCommercialUnits(testData.unitsNumber)
            .clickSaveButton()
            .verifyProgressBarNotExist();
        cy.saveLocalStorage();
    });

    beforeEach(() => {
        cy.restoreLocalStorage();
        _NavigationSection.openPageByVisit(_IncomeRoutes._CommercialRoutes._InPlaceRentRoll);
    });

    it("All units are occupied and have rent PSF filled in", () => {
        cy.stepInfo("Fill lease statuses, enter rentPSF values");
        Income._CommercialManager.InPlaceRentRoll
            .chooseListLeaseStatuses(testData.allOccupiedStatuses, testData.unitsNumber)
            .enterListPerSF(testData.allOccupiedStatuses, testData.rentPSFs);
        cy.stepInfo("Navigate to commercial rent comps, verify computed subject column");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps
            .verifyComputedSubjectColumn(testData.rentPSFs, testData.allOccupiedStatuses);
    });

    it("Some Occupied units don't have rent PSF filled in", () => {
        cy.stepInfo("Fill lease statuses, enter rentPSF values");
        Income._CommercialManager.InPlaceRentRoll
            .chooseListLeaseStatuses(testData.allOccupiedStatuses, testData.unitsNumber)
            .enterListPerSF(testData.allOccupiedStatuses, testData.someZeroRentPSFs);
        cy.stepInfo("Navigate to commercial rent comps, verify computed subject column");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps
            .verifyComputedSubjectColumn(testData.someZeroRentPSFs, testData.allOccupiedStatuses);
    });

    it("At least one unit is Vacant, others are Occupied and have rent PSF filled in", () => {
        cy.stepInfo("Fill lease statuses, enter rentPSF values");
        Income._CommercialManager.InPlaceRentRoll
            .chooseListLeaseStatuses(testData.oneVacantStatus, testData.unitsNumber)
            .enterListPerSF(testData.oneVacantStatus, testData.someZeroRentPSFs);
        cy.stepInfo("Navigate to commercial rent comps, verify computed subject column");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps
            .verifyComputedSubjectColumn(testData.someZeroRentPSFs, testData.oneVacantStatus);
    });

    it("All units are Vacant", () => {
        cy.stepInfo("Fill lease statuses");
        Income._CommercialManager.InPlaceRentRoll
            .chooseListLeaseStatuses(testData.allVacantStatuses, testData.unitsNumber);
        cy.stepInfo("Navigate to commercial rent comps, verify computed subject column");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps.verifyComputedSubjectColumn(testData.rentPSFs, testData.allVacantStatuses);
    });

    it("Vacant units were previously saved as Occupied and had rent PSF filled in", () => {
        cy.stepInfo("Fill lease statuses occupied, enter rentPSF values");
        Income._CommercialManager.InPlaceRentRoll
            .chooseListLeaseStatuses(testData.allOccupiedStatuses, testData.unitsNumber)
            .enterListPerSF(testData.allOccupiedStatuses, testData.rentPSFs);
        cy.stepInfo("Navigate to commercial rent comps, verify computed subject column with all occupied units");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps
            .verifyComputedSubjectColumn(testData.rentPSFs, testData.allOccupiedStatuses);
        _NavigationSection.navigateToCommercialInPlaceRentRoll();
        cy.stepInfo("Edit one lease status to vacant");
        Income._CommercialManager.InPlaceRentRoll.chooseLeaseStatusByRowNumber("Vacant", 1);
        cy.stepInfo("Navigate to commercial rent comps, verify computed subject column with edited unit status");
        _NavigationSection.navigateToCommercialRentComps();
        Income._CommercialManager.RentComps
            .verifyComputedSubjectColumn(testData.rentPSFs, testData.oneVacantStatus);
    });

    it("All units don't have Lease Status filled in (form can't be saved in this case)", () => {
        Income._CommercialManager.InPlaceRentRoll
            .chooseListLeaseStatuses(testData.allVacantStatuses, testData.unitsNumber);
        cy.stepInfo("Delete all lease statuses values");
        for (let i = 0; i < testData.unitsNumber; i++) {
            Income._CommercialManager.InPlaceRentRoll.pressDeleteLeaseStatusByRow(i);
        }
        cy.stepInfo("Verify that form cannot be saved");
        Income._CommercialManager.InPlaceRentRoll.clickSaveButton(false);
        for (let i = 0; i < testData.unitsNumber; i++) {
            Income._CommercialManager.InPlaceRentRoll.verifyLeaseStatusNeedsToBeFilled(i);
        }
    });
});