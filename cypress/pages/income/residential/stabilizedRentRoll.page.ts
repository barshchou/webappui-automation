import ResidentialRentRollSharedPage from "../../shared_components/residentialRentRoll.shared.page";

class StabilizedRentRollPage extends ResidentialRentRollSharedPage{

    getSummaryTableUnitByType(type) {return cy.xpath(`//*[@data-qa='unit-group-name'][.='${type}']`);}

    getSummaryTableRentConclusionUnit(unitType) {
        return cy.xpath(`//*[@data-qa='unit-group-name'][.='${unitType}']` +
            "//following-sibling::td[@data-qa='unit-group-market-rent-conclusion']");
    }

    get monthlyRentCellsInputs() {return cy.get("[data-qa=rent-cell] input:not([type=hidden])");}

    get totalAnnualRent() {return cy.get("[data-qa=total-annual-cell]");}

    get rentPerRoomCells() {return cy.get("[data-qa=rentPerRoom-cell]");}

    get rentRollDiscussionCommentary() {return cy.get("[data-qa^='rentRollDiscussion.commentary']");}

    get occupancyRateEditButton() {return cy.get("[data-qa^=occupancyRateDiscussion] [data-qa$=edit-btn]");}

    get occupancyRateInput() {return cy.get("[name='occupancyRateDiscussion.commentary']");}
}

export default new StabilizedRentRollPage();
