import { ContentManagementSystem } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class LetterOfTransmittalPage extends BasePage {
    letterOfTransmittalDiscussionSection(sectionName: ContentManagementSystem.LetterOfTransmittalSections) {
        return cy.xpath(`//h6[.='${sectionName}']//following::div[@data-slate-editor][1]`);
    }

    letterOfTransmittalModifiedLabel(sectionName: ContentManagementSystem.LetterOfTransmittalSections) {
        return cy.xpath(`//h6[.='${sectionName}']/following::*[@ui='indicator'][1]`);
    }
}

export default new LetterOfTransmittalPage();