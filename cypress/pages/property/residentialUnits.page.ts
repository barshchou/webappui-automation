import BasePage from "../base/base.page";

class ResidentialUnitsPage extends BasePage {
    get kitchenConditionRadio() { return cy.get("[name='kitchen.condition']"); }

    get kitchenFlooring() { return cy.get("[name^='kitchen.floors']"); }

    get counterTops() { return cy.get("[name^='kitchen.counters']"); }

    get cabinetry() { return cy.get("[name^='kitchen.cabinets']"); }

    get stovetops() { return cy.get("[name^='kitchen.stovetops']"); }

    get refrigerators() { return cy.get("[name^='kitchen.refrigerators']"); }

    get kitchenConditionCommentary() { return cy.get("[data-qa*='kitchen.writeup.commentary']"); }

    get bathroomCondition() { return cy.get("[name='bathroom.condition']"); }

    get bathroomFlooring() { return cy.get("[name^='bathroom.floors']"); }

    get bathroomTub() { return cy.get("[name^='bathroom.tub']"); }

    get sink() { return cy.get("[name^='bathroom.sink']"); }

    get toilet() { return cy.get("[name^='bathroom.toilet']"); }

    get bathroomConditionCommentary() { return cy.get("[data-qa*='bathroom.writeup.commentary']"); }

    get bedroomCondition() { return cy.get("[name='bedroom.condition']"); }

    get bedroomFlooring() { return cy.get("[name^='bedroom.floors']"); }

    get bedroomWalls() { return cy.get("[name^='bedroom.walls']"); }

    get bedroomCommentary() { return cy.get("[data-qa*='bedroom.writeup.commentary']"); }

    get livingRoomCondition() { return cy.get("[name='living.condition']"); }

    get livingRoomFlooring() { return cy.get("[name^='living.floors']"); }

    get livingRoomWalls() { return cy.get("[name^='living.walls']"); }

    get livingRoomCommentary() { return cy.get("[data-qa*='living.writeup.commentary']"); }

    get numberOfStairsInput() { return cy.get("[name='stairs.numberOfStairs']"); }

    get stairsStart() { return cy.get("[name='stairs.stairsStart']"); }

    get stairsEnd() { return cy.get("[name='stairs.stairsEnd']"); }

    get stairsCommentaryEditButton() { return cy.get("[data-qa*='stairs.writeup-generated'] [data-qa*='edit-btn']"); }

    get stairsCommentaryInput() { return cy.get("[name='stairs.writeup.commentary']"); }

    getElementToCheckRadio(value: string) { return cy.get(`[data-qa=checked] input[value='${value}']`); }
}

export default new ResidentialUnitsPage();
