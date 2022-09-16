import { RealClickOptions } from 'cypress-real-events/commands/realClick';
/* eslint-disable @typescript-eslint/triple-slash-reference */
// eslint-disable-next-line multiline-comment-style
/// <reference types="cypress-xpath" />
/// <reference types="cypress-image-snapshot" />

/**
 * Use this class for QA-5043
 */
import BasePage from "../../pages/base/base.page";
import BaseActions from "./base.actions";
import { numberWithCommas } from "../../../utils/numbers.utils";
import { Utils } from '../../types/utils.type';
import { BoweryReports } from "../../types/boweryReports.type";

export default class BaseActionsExt<T extends BasePage> extends BaseActions {
    Page: T;

    constructor(page: T) {
        super();
        this.Page = page;
    }

    verifyTooltipExistOrNot(isExist = true) {
        const matcher = isExist ? "exist" : "not.exist";
        this.Page.tooltip.should(matcher);
        return this;
    } 

    /**
     * 
     * @param aliasName alias name, you don't need to procees string with '@'
     * @see https://docs.cypress.io/api/commands/as
     * @returns Cypress.Chainable with aliased value
     */
    extractAlias(aliasName: string) {
        return cy.get(`@${aliasName}`);
    }

    /**
     * @description As you can see, this.Page.pageHeaderElement is not defined, because it does not exist on basPage,
     * but this method dynamically takes defined pageHeaderElement from the page, with which parametrized an action,
     * on what we call this method, so if we want to use this method on any action, we have to define in appropriate
     * page an element with exact same name pageHeaderElement, which we want to hide.
     * 
     * For example: if we take expenseForecast page, there is a defined element pageHeaderElement and if we call 
     * this method on the expenseForecast action, which extends BaseActionsExt and parametrized with expenseForecast 
     * page, this method will take pageHeaderElement from expenseForecast page for hiding. 
     * 
     * By using this way, we avoid code duplicating and we don't have to worry about, 
     * how to pass element correctly, our code will dynamically define the needed one.
     */
    hideHeader() {
        cy.log('hide');
        if (Cypress.browser.isHeadless == true) {
            this.hideElement(this.Page.Header);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.hideElement(this.Page.pageHeaderElement);
        }
        return this;
    }

    /**
     * Drags and drop draggable elements in list.
     * 
     * WARN: movement up is not work correctly due to incorrect work of `react-beautiful-dnd` component.
     * The way you can move up is actually by sending `space` keyevent, but not the `upArrow`
     * 
     * @see cypress spec for testing reorder list: 
     * https://github.com/atlassian/react-beautiful-dnd/blob/master/cypress/integration/reorder.spec.js
     * @param draggableSelector selector for draggable element. This must be a plain string, not Page Element
     * @param elemIndex number of element in list to be moved. NOTE: 0 - first, -1 - last.
     * @param updown upArrow or downArrow key. It will determine what key sequence you're gonna send.
     * @param positionToMove number of position to be moved up or down. 
     */
    moveComparableByDnD = (draggableSelector: string, elemIndex = 0, updown: "up" | "down", 
        positionToMove = 1): this => {
        const compAlias = "draggableElem";
        const _arrowKey: string = (updown == "up" ? "upArrow" : "downArrow");
        const _arrowKeySeq: string[] = Array(positionToMove).fill(`{${_arrowKey}}`);
        
        cy.get(draggableSelector).eq(elemIndex).as(compAlias);
    
        cy.get(`@${compAlias}`)
            .focus()
            .trigger("keydown", { keyCode: 9, force: true })
            .focus()
            .trigger("keydown", { keyCode: 32, force:true })
            .type(`${_arrowKey}`, { force:true })
            .type(`${_arrowKeySeq}`, { force:true, delay: 2000 })
            .wait(1500)
            .trigger("keydown", { keyCode: 32, force:true });
        
        return this;
    };

    enterInSelectChipsWrapper(enterValue: string, elemIndex = 0) {
        this.Page.getSelectChipsWrapper(elemIndex).type(`${enterValue}{enter}`);
        cy.get(`[data-qa='${enterValue}']`).eq(elemIndex).should("exist");
        return this;
    }

    clickFormRevertToOriginalBtn(index = 0): this {
        this.Page.formRevertToOriginalBtn(index).click();
        return this;
    }

    clickFormAddBtn(index = 0): this {
        this.Page.formAddButton(index).click();
        return this;
    }

    // TODO: QA-6548 Removed cy.wait() when we determine how to save changes after editing
    enterFormCommentTextBox(name: string, text: string, isClickHeader = true, 
        option: RealClickOptions = { position: "bottomRight" }): this {
        this.Page.formCommentTextBox(name).realClick({ position: option.position }).type(text);
        if (isClickHeader) {
            this.Page.Header.realClick();
        }
        cy.wait(1000);
        return this;
    }

    clearFormCommentTextBox(name: string): this {
        this.Page.formCommentTextBox(name).realClick().realPress([ "Control", "A" ]);
        this.Page.formCommentTextBox(name).realPress("Backspace");
        return this;
    }

    verifyFormCommentTextBoxText(name: string, textToBe: string | number, matcher = "contain.text"): this {
        let expectedText = typeof textToBe ===  "number"
            ? `${numberWithCommas(textToBe)}`
            : textToBe;
        this.Page.formCommentTextBox(name).should(matcher, expectedText);
        return this;
    }

    verifyOpenedPage(pageName: string): this {
        this.Page.pageTitle.should("have.text", pageName);
        return this;
    }

    saveCmsSettings(): BaseActions {
        this.Page.saveButtonGlobal.click();
        this.Page.successModal.should('be.visible');
        this.Page.successModal.should('not.be.visible');
        return this;
    }

    revertSectionToOriginal(sectionName: string): this {
        this.Page.formCommentTextBox(sectionName).scrollIntoView().realClick();
        this.Page.formCommentTextBox(sectionName).type(`{ESC}`);
        this.Page.formCommentTextBox(sectionName).focus();
        this.Page.formRevertToOriginalBtnBySectionName(sectionName).click({ force: true });
        this.clickFormYesRevertButton();
        this.saveCmsSettings();
        return this;
    }

    revertToOriginalCommentarySectionByName(name: string): this {
        this.Page.formCommentTextBox(name).realClick();
        this.clickRevertToOriginalButtonBySection(name)
            .clickFormYesRevertButton();
        return this;
    }

    clickFormYesRevertButton(): this {
        this.Page.formYesRevertBtn.click();
        return this;
    }

    clickRevertToOriginalButtonBySection(name: string): this {
        this.Page.formRevertToOriginalBtnBySectionName(name).click();
        return this;
    }

    /**
     * Method for typing values into input which re-renders on every char typed into there.
     * Can be useful for such inputs as `commercialUnitsPage.commercialUnitsSFInputs`
     */
    setValueIntoNumberInput(elemAlias: string, value: string | number, index = 0): this {
        cy.get(`@${elemAlias}`).eq(index).should("be.enabled").focus().clear();
        (""+value).split("").forEach(n => {
            cy.get(`@${elemAlias}`).eq(index).focus().type(`${n}`);
            cy.wait(100);
        });
        return this;
    }

    verifyStyleInDefaultChip(chip: string, color = "rgb(210, 65, 65)", backgroundColor = "rgb(255, 233, 233)"): this {
        this.Page.getDefaultCommentChip(chip).should("have.css", "color", color)
            .and("have.css", "background-color", backgroundColor);
        return this;
    }

    clickCloseIcon(): this {
        this.Page.CloseIcon.click();
        return this;
    }

    waitForUrl(route: Utils.Routes) {
        cy.url().should("include", route);
        return this;
    }

    submitSaveChangesModal(saveChanges = true): this {
        cy.get("body").then($body => {
            if ($body.text().includes("You have unsaved changes")) {
                cy.get("[data-qa=form-confirm-dialog]").invoke('prop', 'hidden').then($prop => {
                    cy.log(`${$prop}`);
                    if ($prop == false) {
                        if (saveChanges) { 
                            this.clickYesButton(); 
                        } else {
                            this.clickNoButton();
                        }
                    }
                });
            }
        });
        return this;
    }

    clickEditDataBySectionName(name: BoweryReports.EditOnSubjectPropertySections): this {
        this.Page.getEditIconBySectionName(name).click();
        return this;
    }
}
