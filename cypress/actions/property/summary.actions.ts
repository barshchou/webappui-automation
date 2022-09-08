import summaryPage from "../../pages/property/summary.page";
import BaseActionsExt from "../base/base.actions.ext";
import { _NavigationSection } from "../base";
import routesUtils from "../../utils/routes.utils";
import Enums from "../../enums/enums";
import { numberWithCommas } from "../../../utils/numbers.utils";

class SummaryActions extends BaseActionsExt<typeof summaryPage> {

    verifyThatPageIsOpened(): this {
        summaryPage.headerSection.should("be.visible");
        return this;
    }

    verifyCensusTract(value) {
        summaryPage.censusTractField.should("have.value", value);
        return this;
    }

    verifyBuildingDescriptor(value) {
        summaryPage.buildingDescriptor.should("have.value", value);
        return this;
    }

    verifySiteDetails(siteDetails: Readonly<{ censusTract: string; buildingDescriptor: string;
    }>): SummaryActions {
        this.verifyCensusTract(siteDetails.censusTract)
            .verifyBuildingDescriptor(siteDetails.buildingDescriptor);
        return this;
    }

    goToEditBuildingDescriptionSubjectPropertyData(isSaveChanges = true): SummaryActions {
        summaryPage.editBuildingDescriptionPropertyDataButton.click();
        _NavigationSection.submitSaveChangesModal(isSaveChanges)
            .verifyProgressBarNotExist()
            .waitForUrl(`${routesUtils.subjectPropertyData}#${Enums
                .SUBJECT_PROPERTY_DATA_SECTIONS.propertyDescription}`);
        return this;
    }

    verifyNumberOfCommercialUnits(numberToBe: number | string): SummaryActions {
        summaryPage.numberCommercialUnits.should("contain.text", numberToBe);
        return this;
    }

    verifyNumberOfResidentialUnits(numberToBe: number | string): SummaryActions {
        summaryPage.numberResidentialUnits.should("contain.text", numberToBe);
        return this;
    }

    verifyBuildingName(nameToBe: string): SummaryActions {
        summaryPage.buildingName.should("contain.text", nameToBe);
        return this;
    }

    verifyYearBuilt(yearToBe: number | string): SummaryActions {
        summaryPage.yearBuilt.should("contain.text", yearToBe);
        return this;
    }

    verifyGrossBuildingArea(gbaToBe: number | string): SummaryActions {
        const textToContain = typeof gbaToBe === "string" ? gbaToBe : numberWithCommas(gbaToBe);
        summaryPage.grossBuildingArea.should("contain.text", textToContain);
        return this;
    }
}

export default new SummaryActions(summaryPage);