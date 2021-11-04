import navigationSectionPage from "../../pages/base/navigationSection.page";
import BaseActions from "./base.actions";

class NavigationSectionActions extends BaseActions {
    clickIncomeApproachButton() {
        navigationSectionPage.incomeApproachButton.click();
    }

    clickResidentalIncomeArrow() {
        navigationSectionPage.residentalIncomeArrow.click();
    }

    clickInPlaceRentRollButton() {
        navigationSectionPage.inPlaceRentRollButton.click();
    }

    clickRentCompsButton() {
        navigationSectionPage.rentCompsButton.click();
    }

    clickCommercialArrow() {
        navigationSectionPage.commercialIncomeArrow.click();
    }

    clickCommercialRentRollButton() {
        navigationSectionPage.commercialRentRollButton.click();
    }

    clickCommercialStabRentRollButton() {
        navigationSectionPage.commercialStabRentRollButton.click();
    }

    clickFinalButton() {
        navigationSectionPage.finalButton.click();
    }

    clickUnitInspectionButton() {
        navigationSectionPage.unitInspectionButton.click();
    }

    clickPropertyButton() {
        navigationSectionPage.propertyButton.click();
    }

    clickCommercialUnits() {
        navigationSectionPage.commercialUnitsButton.click();
    }

    clickSummaryButton() {
        navigationSectionPage.summaryButton.click();
    }

    clickClientButton() {
        navigationSectionPage.clientButton.click();
    }

    clickMarketButton() {
        navigationSectionPage.propertyMarketButton.click();
    }

    clickPropertyHistory() {
        navigationSectionPage.propertyHistoryButton.click();
    }

    clickPropertyDescription() {
        navigationSectionPage.propertyDescriptionButton.click();
    }

    clickSiteDescriptionButton() {
        navigationSectionPage.siteDescription.click();
    }

    clickMapsButton() {
        navigationSectionPage.propertyMaps.click();
    }

    clickUtilitiesButton() {
        navigationSectionPage.utilities.click();
    }

    clickAmenitiesButton() {
        navigationSectionPage.amenities.click();
    }

    clickPhotosButton() {
        navigationSectionPage.propertyPhotos.click();
    }

    clickZoningButton() {
        navigationSectionPage.propertyZoning.click();
    }

    navigateToCommercialUnits() {
        this.clickSaveButton();
        this.verifyProgressBarNotExist();
        this.clickSaveButton();
        this.verifyProgressBarNotExist();
        this.clickPropertyButton();
        this.clickCommercialUnits();
    }

    navigateToUnitInspection() {
        this.clickSaveButton();
        this.clickFinalButton();
        this.clickUnitInspectionButton();
        this.verifyProgressBarNotExist();
    }

    navigateToInPlaceRentRoll() {
        this.clickIncomeApproachButton();
        this.clickResidentalIncomeArrow();
        this.clickInPlaceRentRollButton();
        this.clickYesButton();
    }

    navigateToRentComps() {
        this.clickIncomeApproachButton();
        this.clickResidentalIncomeArrow();
        this.clickRentCompsButton();
        this.clickYesButton();
    }

    navigateToCommercialInPlaceRentRoll(isWithSave = true) {
        this.clickIncomeApproachButton();
        this.clickCommercialArrow();
        this.clickCommercialRentRollButton();
        if (isWithSave) {
            this.clickYesButton();
        }
    }

    navigateToPropertySummary() {
        this.clickPropertyButton();
        this.clickSummaryButton();
        this.clickYesButton();
    }

    openClientPageInReport() {
        this.clickClientButton();
        this.clickYesButton();
    }

    openMarketPageInProperty() {
        this.clickMarketButton();
        this.clickYesButton();
    }

    openPropertyHistoryInProperty() {
        this.clickPropertyHistory();
        this.clickYesButton();
    }

    openDescriptionInProperty() {
        this.clickPropertyDescription();
        this.clickYesButton();
    }

    openSiteDescriptionInProperty() {
        this.clickSiteDescriptionButton();
        this.clickYesButton();
    }

    openMapsInProperty() {
        this.clickMapsButton();
        this.clickYesButton();
    }

    openUtilitiesInProperty() {
        this.clickUtilitiesButton();
        this.clickYesButton();
    }

    openAmenitiesInProperty() {
        this.clickAmenitiesButton();
        this.clickYesButton();
    }

    openPhotosInProperty() {
        this.clickPhotosButton();
        this.clickYesButton();
    }

    openZoningInProperty() {
        this.clickZoningButton();
        this.clickYesButton();
    }
}

export default new NavigationSectionActions();