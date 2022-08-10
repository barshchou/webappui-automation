import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    get saveButtonGlobal() { return cy.xpath("//button[@type='submit']"); }

    get successModal() { return cy.xpath("//*[contains(text(), 'Success')]"); }

    letterOfTransmittalDiscussionSection(sectionName: BoweryReports.LetterOfTransmittalSections) {
        return cy.xpath(`//h6[.='${sectionName}']//following::div[@data-slate-editor][1]`);
    }

    letterOfTransmittalModifiedLabel(sectionName: BoweryReports.LetterOfTransmittalSections) {
        return cy.xpath(`//h6[.='${sectionName}']/following::*[@ui='indicator'][1]`);
    }
}

export default new LetterOfTransmittalPage();