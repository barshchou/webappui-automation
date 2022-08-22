import commercialUnitsPage from "../../pages/property/commercialUnits.page";
import { cutDecimalPartToNumberOfDigits, 
    isHasDecimalPartMoreNumberOfDigits, 
    numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";
import { normalizeText } from "../../../utils/string.utils";
import { Alias } from "../../utils/alias.utils";

const { commercialUnitsSFInputs } = Alias.pageElements.commercialUnits;

class CommercialUnitsActions extends BaseActionsExt<typeof commercialUnitsPage> {

    verifyThatPageIsOpened(): CommercialUnitsActions {
        commercialUnitsPage.commercialUnitHeaderSection.should("be.visible");
        cy.url().then(url => {
            let urlObj = new URL(url);
            cy.log("Check whether current URL ends with '/commercial-units'");
            cy.wrap(urlObj.pathname.endsWith("/commercial-units")).should("be.true");
        });
        return this;
    }

    verifyImageHasRotated(category: BoweryReports.ImageType, rotateIndex: number): CommercialUnitsActions {
        commercialUnitsPage.getCommercialUnitImage(category)
            .invoke("attr", "style").then(style => {
                expect(style).includes(`w_256,a_${90 * rotateIndex}`);
            });
        return this;
    }

    /**
     *NOTE: Rotates last image
     */
    rotateImage(category: BoweryReports.ImageType, index = 0): CommercialUnitsActions {
        commercialUnitsPage.getIconRotateImage(category, index).click({ force: true });
        return this;
    }

    uploadImages(category: BoweryReports.ImageType, pathToFile: string, 
        inputMethod: "drag-n-drop" | "input"): CommercialUnitsActions {
        let aliasImageUpload = "aliasImageUpload";
        cy.intercept("POST", "/imageUpload").as(aliasImageUpload);

        this.Page.getImageCategoryImageUpload(category).attachFile(pathToFile, { subjectType: inputMethod });

        cy.wait(`@${aliasImageUpload}`).then(({ response }) => {
            expect(response.statusCode).equal(200);
            cy.log("imageUpload resolved");
        });
        return this;
    }

    clickCommercialUnitTabByIndex(index = 0): CommercialUnitsActions {
        commercialUnitsPage.commercialUnitsTabs.eq(index).click();
        return this;
    }

    private clickRadioOrCheckbox(group: BoweryReports.CommercialUnits.Groups,
        value: BoweryReports.CommercialUnits.GroupsValues): CommercialUnitsActions {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value).click();
        return this;
    }

    clickRadioButtonByValueAndUnitIndex(group: BoweryReports.CommercialUnits.Groups,
        value: BoweryReports.CommercialUnits.GroupsValues, index = 0): CommercialUnitsActions {
        this.clickRadioOrCheckbox(group, value)
            .verifyRadioIsChecked(group, value);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("exist")
                .should("have.attr", "required");
        }
        return this;
    }

    clickCheckboxToUncheck(group: BoweryReports.CommercialUnits.Groups, 
        value: BoweryReports.CommercialUnits.GroupsValues,
        index = 0): CommercialUnitsActions {
        this.clickRadioOrCheckbox(group, value)
            .verifyRadioIsNotChecked(group, value);
        if (value === "other") {
            commercialUnitsPage.getOtherFieldByGroup(group, index).should("not.exist");
        }
        return this;
    }

    verifyRadioIsChecked(group: BoweryReports.CommercialUnits.Groups, 
        value: BoweryReports.CommercialUnits.GroupsValues): CommercialUnitsActions {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value).parent()
            .should("have.class", "Mui-checked");
        return this;
    }

    verifyRadioIsNotChecked(group: BoweryReports.CommercialUnits.Groups, 
        value: BoweryReports.CommercialUnits.GroupsValues): CommercialUnitsActions {
        commercialUnitsPage.getRadioButtonByValueAndUnitIndex(group, value).parent()
            .should("not.have.class", "Mui-checked");
        return this;
    }

    enterUnitSFByUnitIndex(squareFeet: number | string, index = 0): CommercialUnitsActions {
        let squareFeetToBe: string | number = squareFeet;
        if (isHasDecimalPartMoreNumberOfDigits(squareFeet)) {
            squareFeetToBe = cutDecimalPartToNumberOfDigits(squareFeet);
        }
        commercialUnitsPage.commercialUnitsSFInputs.as(commercialUnitsSFInputs);

        this.Actions.setValueIntoNumberInput(commercialUnitsSFInputs, squareFeet, index);

        commercialUnitsPage.commercialUnitsSFInputs.eq(index).should("have.value", numberWithCommas(squareFeetToBe));
        return this;
    }

    enterListUnitSF(squareFeetList: Array<number | string>, numberOfUnits: number): CommercialUnitsActions {
        for (let i = 0; i < numberOfUnits; i++) {
            this.enterUnitSFByUnitIndex(squareFeetList[i], i);
        }
        return this;
    }

    verifyUnitSFInscribedByUnitIndex(squareFeetList: Array<number | string>, 
        numberOfUnits: number): CommercialUnitsActions {
        for (let i = 0; i < numberOfUnits; i++) {
            commercialUnitsPage.commercialUnitsSFInputs.eq(i).should("have.value", squareFeetList[i]);
        }
        return this;
    }

    verifyCommercialGrossLeasableAreaFieldIsDisabled(): CommercialUnitsActions {
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.should('have.attr', 'disabled');
        return this;
    }

    verifyCommercialGrossLeasableAreaEqualSumUnitSF(squareFeetList: Array<number>): CommercialUnitsActions {
        const sumAllUnitSFInArray = squareFeetList.reduce(
            (previousValue, currentValue) => previousValue + currentValue
        );
        commercialUnitsPage.commercialGrossLeasableAreaTextArea.invoke('prop', 'defaultValue').then(defaultValue => {
            const valueOfGrossLeasableAreaTextArea = parseInt(defaultValue);
            expect(valueOfGrossLeasableAreaTextArea).to.be.equal(sumAllUnitSFInArray);
        });
        return this;
    }

    verifyCommercialUnitSFDiscussionTextAreaContains(text: string): CommercialUnitsActions {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("contain.text", text);
        return this;
    }

    verifyCommercialUnitSFDiscussionTextAreaNotContains(text: BoweryReports.CommercialUnits.UseValues): 
    CommercialUnitsActions {
        commercialUnitsPage.commercialUnitSFDiscussionTextArea.should("not.contain.text", text);
        return this;
    }

    enterOtherValueByGroupName(groupName: BoweryReports.CommercialUnits.Groups, value: string, index = 0): 
    CommercialUnitsActions {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).clear().type(value);
        this.verifyOtherValueByGroupName(groupName, value);
        return this;
    }

    verifyOtherValueByGroupName(groupName: BoweryReports.CommercialUnits.Groups, value: string, index = 0): 
    CommercialUnitsActions {
        commercialUnitsPage.getOtherFieldByGroup(groupName, index).should("have.value", value);
        return this;
    }

    editDiscussionTextArea(value: string, clearText = true): CommercialUnitsActions {
        clearText ? this.Page.commentaryText.dblclick().clear({ force: true }).type(value) :
            this.Page.commentaryText.type(value);
        return this;
    }

    clickNarrativeSuggestions(verifyListValue: string): CommercialUnitsActions {
        this.Page.narrativeSuggestionsList.first()
            .contains(verifyListValue).should("have.text", verifyListValue).click({ force: true }); 
        this.Page.commentaryText.click();
        return this;
    }

    verifyCommentaryContainsText(verifyAreaValue: string | number): CommercialUnitsActions {
        let expectedText = typeof verifyAreaValue ===  "number" 
            ? `${numberWithCommas(verifyAreaValue)}`
            : verifyAreaValue;
        this.Page.commentaryText.should("include.text", `${expectedText}`);
        return this;
    }

    clickRevertToOriginalButton(): CommercialUnitsActions {
        this.Page.formRevertToOriginalBtn().click();
        this.Page.changesLostModalHeader.should("exist");
        return this;
    }

    clickCloseButton(): CommercialUnitsActions {
        this.Page.CloseIcon.click();
        return this;
    }

    clickCancelRevertButton(): CommercialUnitsActions {
        this.Page.cancelRevertButton.click();
        return this;
    }

    clickYesRevertButton(): CommercialUnitsActions {
        this.Page.formYesRevertBtn.click();
        return this;
    }

    verifyCommentaryFullText(textToBe: string): CommercialUnitsActions {
        this.Page.commentaryText.invoke('text').then(text => {
            cy.wrap(normalizeText(text)).should('deep.equal', textToBe);
        });
        return this;
    }

    clickCancelDiscussionEditButton(): CommercialUnitsActions {
        this.Page.formCancelButton().click();
        return this;
    }

    clickCommercialUnitTab(unitNumber = 1): CommercialUnitsActions {
        this.Page.commercialUnitsTab(unitNumber).click();
        return this;
    } 

}

export default new CommercialUnitsActions(commercialUnitsPage);
