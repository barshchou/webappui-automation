import BaseActionsExt from "../base/base.actions.ext";
import subjectPropertyDataPage from "../../pages/data_collections/subject_property_data.page";
import { BoweryReports } from "../../types/boweryReports.type";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class SubjectPropertyDataActions extends BaseActionsExt<typeof subjectPropertyDataPage> {

    enterNumberOfResUnits(number: number, notInclude?: string[]): SubjectPropertyDataActions {
        subjectPropertyDataPage.numberOfResUnitsInput.clear().type(`${number}`).should("have.value", number);
        if (notInclude) {
            notInclude.forEach(val => {
                subjectPropertyDataPage.numberOfResUnitsInput.should("not.include.value", val);
            });
        }
        return this;
    }

    selectBasisSquareFootAnalysis(basisSquareFootAnalysis: BoweryReports.BasisSquareFootAnalysis
    ): SubjectPropertyDataActions {
        subjectPropertyDataPage.basisSquareFootAnalysis(basisSquareFootAnalysis)
            .click()
            .should('be.checked');
        return this;
    }

    fillBasisSquareFootAnalysis(area: number): SubjectPropertyDataActions {
        subjectPropertyDataPage.basisSquareFootAnalysisArea
            .clear()
            .type(`${area}`)
            .should('have.value', `${numberWithCommas(area)}`);
        return this;
    }

    enterNumberOfCommercialUnits(number = 1,  notInclude?: string[]): SubjectPropertyDataActions {
        subjectPropertyDataPage.numberOfCommercialUnitsInput.clear().type(`${number}`).should("have.value", number);
        if (notInclude) {
            notInclude.forEach(val => {
                subjectPropertyDataPage.numberOfCommercialUnitsInput.should("not.include.value", val);
            });
        }
        return this;
    }

    enterGrossBuildingArea(area: number | string): SubjectPropertyDataActions {
        const valueToBe = typeof area === "string" ? area : numberWithCommas(area);
        subjectPropertyDataPage.grossBuildingArea.clear().type(`${area}`).should("have.value", valueToBe);
        return this;
    }

    verifyGrossBuildingArea(gbaToBe: string | number): SubjectPropertyDataActions {
        const valueToBe = typeof gbaToBe === "string" ? gbaToBe : numberWithCommas(gbaToBe);
        subjectPropertyDataPage.grossBuildingArea.should("have.value", valueToBe);
        return this;
    }

    enterFloorsNumber(number: number): SubjectPropertyDataActions {
        subjectPropertyDataPage.floorsNumber.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    fillAsCompleteBuildingDescription(description: Readonly<{ grossArea: number; numberOfUnits: number;
        floorsNumber: number; }>): SubjectPropertyDataActions {
        this.enterGrossBuildingArea(description.grossArea)
            .enterNumberOfResUnits(description.numberOfUnits)
            .enterFloorsNumber(description.floorsNumber);
        return this;
    }

    enterCurrentGrossBuildingArea(area: number): SubjectPropertyDataActions {
        if (isHasDecimalPartMoreNumberOfDigits(area, 2)) {
            area = cutDecimalPartToNumberOfDigits(area, 2);
        }
        const textToBe = numberWithCommas(area);
        subjectPropertyDataPage.currentGrossBuildingArea.clear().type(`${area}`).should("have.value", textToBe);
        return this;
    }

    enterCurrentNumberOfResUnits(number: number): SubjectPropertyDataActions {
        subjectPropertyDataPage.currentNumberOfResUnits.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    enterCurrentFloorsNumber(number: number): SubjectPropertyDataActions {
        subjectPropertyDataPage.currentFloorsNumber.clear().type(`${number}`).should("have.value", number);
        return this;
    }

    fillCurrentBuildDescription(description: Readonly<{ grossArea: number; numberOfUnits: number;
        floorsNumber: number; }>): SubjectPropertyDataActions {
        this.enterCurrentGrossBuildingArea(description.grossArea)
            .enterCurrentNumberOfResUnits(description.numberOfUnits)
            .enterCurrentFloorsNumber(description.floorsNumber);
        return this;
    }

    verifyStreetAddress(value: string): SubjectPropertyDataActions {
        subjectPropertyDataPage.streetAddress.should("have.value", value);
        return this;
    }

    verifyStreetName(value: string): SubjectPropertyDataActions {
        subjectPropertyDataPage.streetName.should("have.value", value);
        return this;
    }

    verifyPropertyIdentifierType(value: string): SubjectPropertyDataActions {
        subjectPropertyDataPage.propertyIdentifierType.should("have.value", value);
        return this;
    }

    verifyPropertyIdentifier(value: string): SubjectPropertyDataActions {
        subjectPropertyDataPage.propertyIdentifier.should("have.value", value);
        return this;
    }


    verifySiteDetails(siteDetails: Readonly<{
        streetAddress: string; streetName: string; identifierType: string; identifier: string;
    }>): SubjectPropertyDataActions {
        this.verifyStreetAddress(siteDetails.streetAddress)
            .verifyStreetName(siteDetails.streetName)
            .verifyPropertyIdentifierType(siteDetails.identifierType)
            .verifyPropertyIdentifier(siteDetails.identifier);
        return this;
    }

    enterYearBuilt(year: number): SubjectPropertyDataActions {
        subjectPropertyDataPage.yearBuilt.clear().type(`${year}`).should("have.value", year);
        return this;
    }

    enterSiteArea(area: number): SubjectPropertyDataActions {
        if (isHasDecimalPartMoreNumberOfDigits(area, 4)) {
            area = cutDecimalPartToNumberOfDigits(area, 4);
        }
        const textToBe = numberWithCommas(area);
        subjectPropertyDataPage.siteArea.clear().type(`${area}`).should("have.value", textToBe);
        return this;
    }

    enterBuildingName(buildingName: string): SubjectPropertyDataActions {
        subjectPropertyDataPage.buildingNameInput.clear().type(`${buildingName}`).should("have.value", buildingName);
        return this;
    }

    enterCurrentNumberOfCommercialUnits(number: number): SubjectPropertyDataActions {
        subjectPropertyDataPage.currentNumberOfCommercialUnitsInput.clear()
            .type(`${number}`).should("have.value", number);
        return this;
    }

    enterCurrentOwner(owner: string): SubjectPropertyDataActions {
        subjectPropertyDataPage.currentOwnerField.clear().type(owner).should("have.value", owner);
        return this;
    }

}

export default new SubjectPropertyDataActions(subjectPropertyDataPage);