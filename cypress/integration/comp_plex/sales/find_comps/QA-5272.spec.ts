import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import * as _Sales from "../../../../actions/sales";

describe("[QA-5272]", () => {
    it("Enter Sale Information form] Verify the Buyer(Grantee) field", () => {
        salesInterceptions();
        cy.visit("/");
        _Sales._FindComps.selectCompFromMapByAddress("443 East 88 Street");
        cy.get('[id="selectedComps"]').find("tr").contains("443 East 88 Street")
        .parent()
        .find("a").click();
        
        cy.get('[data-qa="property-info-edit-btn"]', { includeShadowDom:true }).should("be.visible").click();

        cy.get('[data-qa="street-address"] input', { includeShadowDom:true }).should("be.disabled");
        cy.get('[data-qa="city"] input', { includeShadowDom:true }).should("be.disabled");
        cy.get('[data-qa="state"] input', { includeShadowDom:true }).should("be.disabled");
        cy.get('[data-qa="postal-code"] input', { includeShadowDom:true }).should("be.disabled");
        cy.get('[data-qa="property-id"] input', { includeShadowDom:true }).should("be.disabled");
        cy.get('[data-qa="property-id-type"] input', { includeShadowDom:true }).should("be.disabled");        
    });
});