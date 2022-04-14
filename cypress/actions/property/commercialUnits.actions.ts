import BaseActions from "../base/base.actions";
import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import {cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CommercialUnitsActions extends BaseActionsExt<typeof commercialUnitsPage> {
    verifyImageHasRotated(){
        commercialUnitsPage.commercialUnitImage
        .last().invoke("attr","style").then(style => {
            expect(style).includes("w_256,a_90");
        });
        return this;
    }

    /**
     *NOTE: Rotates last image
     */
    rotateImage(){
        commercialUnitsPage.iconRotateImage.last().click({force:true});
        return this;
    }

    uploadImages(imageType: "Interior Images" | "Exterior Images", pathToFile: string, inputMethod: "drag-n-drop" | "input") {
        cy.contains(imageType).next().find('input[type="file"]')
        .attachFile(pathToFile,{subjectType:inputMethod});
        return this;
    }

    clickCommercialUnitTabByIndex(index: number = 0): this {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: string, value: string, index: number = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).click();
        this.verifyRadioIsChecked(group, value, index);
        if (value === "other"){
            commercialUnitsPage.getOtherFrontageByUnit(index).should("exist").should("have.attr", "required");
        }
        return this;
    }

    verifyRadioIsChecked(group: string, value: string, index: number = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent().should("have.class", "Mui-checked");
        return this;
    }

    enterUnitSFByUnitIndex(squareFeet: number | string, index: number = 0): this {
        let squareFeetToBe: string | number = squareFeet;
        if (isHasDecimalPartMoreNumberOfDigits(squareFeet)) {
            squareFeetToBe = cutDecimalPartToNumberOfDigits(squareFeet);
        }
        squareFeetToBe = numberWithCommas(squareFeetToBe);
        commercialUnitsPage.commercialUnitsSFInputs.eq(index).clear().type(`${squareFeet}`)
            .should("have.value", squareFeetToBe);
        return this;
    }

    enterListUnitSF(squareFeetList: Array<number | string>, numberOfUnits: number): this {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
        return this;
    }
}

export default new CommercialUnitsActions(commercialUnitsPage);