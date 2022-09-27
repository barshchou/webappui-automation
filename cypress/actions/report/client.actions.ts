import clientPage from "../../pages/report/client.page";
import { replaceEntersWithLineBreak } from "../../../utils/string.utils";
import BaseActionsExt from "../base/base.actions.ext";
import routesUtils from "../../utils/routes.utils";

class ClientActions extends BaseActionsExt<typeof clientPage> {
    verifyInputChangesToBeUnsaved(clientFileNumber: string, index = 0): ClientActions {
        clientPage.getClientFileNumberField(index).should("have.value", clientFileNumber);
        return this;
    }

    enterClientName(name: string, index = 0): ClientActions {
        clientPage.getClientNameField(index).realClick({ position: "bottom" }).clear().type(name);
        // TODO: QA-7019: add data-qa for suggested list on Report > Client
        cy.xpath('//*[@id="root"]//following-sibling::*[@role="presentation"]').then((elem) => {
            if (elem.is(":visible") && elem.text() == "No options") {
                return;
            }
            if (elem.is(":visible") && elem.text() != "No options") {
                cy.wrap(elem).click();
                return;
            }
        });

        return this;
    }
    
    enterClientFileNumber(name:string, index = 0): ClientActions {
        clientPage.getClientFileNumberField(index).
            realClick({ position: "bottom" }).clear().type(name).should("have.value", name);
        clientPage.getClientFileNumberField(index).should("have.value", name);
        return this;
    }

    enterNycbApplicationNumber(name:string, index = 0): ClientActions {
        clientPage.getNYCBApplicationNumber(index)
            .realClick({ position: "bottom" }).clear().type(name).should("have.value", name);
        clientPage.getNYCBApplicationNumber(index).should("have.value", name);
        return this;
    }

    clickAddClientButton() {
        clientPage.addNewClient.click();
        this.submitSaveChangesModal()
            .waitForUrl(routesUtils.organizationNewClient);
        return this;
    }

    enterAppraiserCommentary(textToType: string): ClientActions {
        clientPage.appraiserCommentary.clear().type(textToType)
            .should("have.text", replaceEntersWithLineBreak(textToType));
        return this;
    }

    verifyGuidelineTooltip() {
        clientPage.guidelinesTooltip.should("exist");
        clientPage.tooltip.should("not.exist");
        return this;
    }

    clickGuidelinesCommentaryEditButton() {
        clientPage.guidelinesCommentaryEditButton.click();
        return this;
    }

    enterNewCommentary(commentary: string): ClientActions {
        clientPage.guidelinesCommentaryInput.clear().type(commentary).should("have.text", commentary);
        return this;
    }

    clickTextBoxEditButton(index = 0) {
        clientPage.formEditBtn(index).click();
        return this;
    }

    clickTextBoxSaveButton(index = 0) {
        clientPage.formSaveBtn(index).click();
        return this;
    } 

    clickNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists).contains(verifyListValue).dblclick({ force: true });
        return this;
    }

    verifyNarrativeSuggestions(verifyListValue: string, numberLists = 0): ClientActions {
        clientPage.narrativeSuggestionsList.eq(numberLists)
            .contains(verifyListValue).should("have.text", verifyListValue);
        return this;
    }

    clickAddAdditionalClientBtn(): ClientActions {
        // todo: add logic for max client number case
        clientPage.addAdditionalClientBtn.click();
        return this;
    }

    verifyAdditionalClientAdded(clientIndex = 1): ClientActions {
        clientPage.getClientNameField(clientIndex).should("exist");
        clientPage.getClientFileNumberField(clientIndex).should("exist");
        clientPage.getNYCBApplicationNumber(clientIndex).should("exist");
        return this;
    }

    clickRemoveAdditionalClientBtn(index = 0): ClientActions {
        clientPage.getRemoveIcon(index).click();
        return this;
    }

    verifyAdditionalClientRemoved(clientIndex = 1, undoIndex = 0): ClientActions {
        clientPage.undoBtn.eq(undoIndex).should("exist");
        // Wait when remove additional client
        cy.wait(4000);
        clientPage.getClientFileNumberField(clientIndex).should("not.exist");
        clientPage.getNYCBApplicationNumber(clientIndex).should("not.exist");
        return this;
    }

    clickUndoBtn(index = 0): ClientActions {
        clientPage.undoBtn.eq(index).click();
        return this;
    }

    verifyAdditionalClientEnableOrNot(clientIndex = 1, isEnable = true): ClientActions {
        const matcher = isEnable ? "be.enabled" : "be.disabled";
        clientPage.getClientNameField(clientIndex).should(matcher);
        clientPage.getClientFileNumberField(clientIndex).should(matcher);
        clientPage.getNYCBApplicationNumber(clientIndex).should(matcher);
        return this;
    }

    clickAddNewClient(): ClientActions {
        clientPage.addNewClient.click();
        this.submitSaveChangesModal();
        return this;
    }

    selectClient(enterValue: string, clientName: string, index = 0): ClientActions {
        clientPage.getClientNameField(index).type(enterValue);
        clientPage.getClientListItem(clientName).click();
        clientPage.getClientNameField(index).should("have.value", clientName);
        return this;
    }
}

export default new ClientActions(clientPage);