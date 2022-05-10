import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import { cutDecimalPartToNumberOfDigits, isHasDecimalPartMoreNumberOfDigits, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class CommercialUnitsActions extends BaseActionsExt<typeof commercialUnitsPage> {
    
    verifyThatPageIsOpened(): this {
        commercialUnitsPage.commercialUnitHeaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-units'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-units")).should("be.true");
        });
        return this;
    }

    verifyImageHasRotated(rotateIndex: number) {
        commercialUnitsPage.commercialUnitImage
            .last().invoke("attr", "style").then(style => {
                expect(style).includes(`w_256,a_${90 * rotateIndex}`);
            });
        return this;
    }

    /**
     *NOTE: Rotates last image
     */
    rotateImage() {
        commercialUnitsPage.iconRotateImage.last().click({ force: true });
        return this;
    }

    uploadImages(imageType: BoweryReports.ImageType, pathToFile: string, inputMethod: "drag-n-drop" | "input") {
        let aliasImageUpload = "aliasImageUpload";
        cy.intercept("POST", "/imageUpload").as(aliasImageUpload);
        cy.contains(imageType).next().find('input[type="file"]')
            .attachFile(pathToFile, { subjectType: inputMethod });
        cy.wait(`@${aliasImageUpload}`).then(({ response }) => {
            expect(response.statusCode).equal(200);
            cy.log("imageUpload resolved");
        });
        return this;
    }

    clickCommercialUnitTabByIndex(index = 0): this {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    private clickRadioOrCheckbox(group: BoweryReports.CommercialUnitsGroups,
                                 value: BoweryReports.CommercialUnits.GroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: BoweryReports.CommercialUnitsGroups,
                                        value: BoweryReports.CommercialUnits.GroupsValues, index = 0): this {
        this.clickRadioOrCheckbox(group, value, index)
            .verifyRadioIsChecked(group, value, index);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("exist")
                .should("have.attr", "required");
        }
        return this;
    }

    clickCheckboxToUncheck(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnits.GroupsValues,
                           index = 0): this {
        this.clickRadioOrCheckbox(group, value, index)
            .verifyRadioIsNotChecked(group, value, index);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("not.exist");
        }
        return this;
    }

    verifyRadioIsChecked(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnits.GroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent().should("have.class", "Mui-checked");
        return this;
    }

    verifyRadioIsNotChecked(group: BoweryReports.CommercialUnitsGroups, value: BoweryReports.CommercialUnits.GroupsValues, index = 0): this {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value, index).parent()
            .should("not.have.class", "Mui-checked");
        return this;
    }

    enterUnitSFByUnitIndex(squareFeet: number | string, index = 0): this {
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

    verifyCommercialGrossLeasableAreaFieldIsDisabled(): this {
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.should('have.attr', 'disabled');
        return this;
    }

    verifyCommercialGrossLeasableAreaEqualSumUnitSF(squareFeetList: Array<number>): this {
        const sumAllUnitSFInArray = squareFeetList.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        );
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.invoke('prop', 'defaultValue').then(defaultValue => {
            const valueOfGrossLeasableAreaTextArea = parseInt(defaultValue);
            expect(valueOfGrossLeasableAreaTextArea).to.be.equal(sumAllUnitSFInArray);
        });
        return this;
    }

    verifyCommercialUnitSFDiscussionTextAreaContains(text: string): this {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("contain.text", text);
        return this;
    }

    verifyCommercialUnitSFDiscussionTextAreaNotContains(text: BoweryReports.CommercialUnitsUseValues): this {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("not.contain.text", text);
        return this;
    }

    enterOtherValueByGroupName(groupName: BoweryReports.CommercialUnitsGroups, value: string, index = 0): this {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).clear().type(value);
        this.verifyOtherValueByGroupName(groupName, value);
        return this;
    }

    verifyOtherValueByGroupName(groupName: BoweryReports.CommercialUnitsGroups, value: string, index = 0): this {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).should("have.value", value);
        return this;
    }
}

export default new CommercialUnitsActions(commercialUnitsPage);
