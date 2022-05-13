import findCompsPage from "../../pages/sales/findComps.page";
import { getUploadFixture } from "../../../utils/fixtures.utils";
import { isNumber, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { Alias } from "../../utils/alias.utils";

class FindCompsActions extends BaseActionsExt<typeof findCompsPage> {

    addExistingComparable(address: string): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.getSelectCompButtonByAddress(address).click();
        return this;
    }

    clickCreateCompButton(): FindCompsActions {
        findCompsPage.createCompButton.click();
        return this;
    }

    enterCompAddressToSearch(address: string): FindCompsActions {
        findCompsPage.searchCompAddressInput.type(address).type("{enter}");
        findCompsPage.findCompField.click();
        return this;
    }

    clickSearchCompButton(): FindCompsActions {
        findCompsPage.submitButton.click();
        return this;
    }

    openAddNewComparableFormSearchResult(address: string, searchResultIndex = 0): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.createCompSearchResults.eq(searchResultIndex).click();
        findCompsPage.createNewCompButton.click();
        return this;
    }

    verifyAddedCompAddress(address: string): FindCompsActions {
        this.verifyProgressBarNotExist();
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).should("exist");
        return this;
    }


    clickImportComparableButton(): FindCompsActions {
        findCompsPage.importCompsButton.click();
        return this;
    }

    verifyImportCompModalShown(): FindCompsActions {
        findCompsPage.importCompModal.should("be.visible");
        return this;
    }

    uploadComps(filePath: string): FindCompsActions {
        findCompsPage.csvInput.attachFile(getUploadFixture(filePath));
        return this;
    }

    verifyComparablesNumber(number: number): FindCompsActions {
        const numberToBe = number + 1;
        findCompsPage.addressCells.should("have.length", numberToBe);
        return this;
    }

    selectCompFromMapByAddress(address: string): FindCompsActions {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).scrollIntoView().click({ force: true });
        cy.wait(`@${Alias.gqlRequest}`, { timeout:70000 }).then((interception) => {
            cy.log(interception.response.body.data.findSingleSalesComp.salesEventId);
            cy.wrap(interception.response.body.data.findSingleSalesComp.salesEventId)
            .as(Alias.salesEventId);
            //data.findSingleSalesComp.salesEventId
            //data.findSingleSalesComp
        });
        findCompsPage.getRemoveCompFromMapButtonByAddress(address).should("exist");
        return this;
    }

    removeCompByAddress(address: string): FindCompsActions {
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).click();
        return this;
    }

    verifyCompIsInRemovedSection(address: string): FindCompsActions {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).should("exist");
        return this;
    }

    verifyCompIsInMap(address: string): FindCompsActions {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).should("exist");
        return this;
    }

    removeDeletedCompByAddress(address: string): FindCompsActions {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).click();
        return this;
    }

    enterReportToSearchComp(reportID: string): FindCompsActions {
        cy.intercept("GET", `/salesComps/eventIds/${reportID}`)
        .as(Alias.salesComps_eventIds);
        findCompsPage.reportToSearchCompInput.type(reportID).should("have.value", reportID);
        return this;
    }

    clickImportCompsFromReportButton(): FindCompsActions {
        findCompsPage.importReportCompsButton.click();
        return this;
    }

    clickSearchButton(): FindCompsActions {
        findCompsPage.searchButton.click();
        return this;
    }

    /**
     * TODO: add description of this method
     * ernst: we're probably gonna need to adapt this check for several salesComps later
     */
    checkSingleSalesCompsByEventId(): this{
        cy.wait(`@${Alias.salesComps_eventIds}`).then(({ response }) => {
            cy.get(`@${Alias.salesEventId}`).then(_salesEventId => {
                let arr: Array<any>  = response.body.selectedEventIds;
                expect(arr.find(val => val.salesEventId == _salesEventId))
                .not.to.be.undefined;
            });
        });
        return this;
    }

    checkSelectedSingleSalesComps() {
        cy.wait(`@${Alias.gqlRequest}`).then(({ request }) => {
            let req: Utils.GraphQLRequest = request.body;
            expect(req.operationName).to.equal("findSalesCompsByEventIds");
            /**
             * ernst: we need to intercept the one findSalesCompsByEventIds, which will have 
             * variables.input.eventIds in its request.body
             * use this guide 
             * @see https://docs.cypress.io/api/commands/intercept#Aliasing-individual-requests
             */
            // cy.get(`@${Alias.salesEventId}`).then(_salesEventId => {
            //     expect(_salesEventId).to.be.equal(
            //         req.variables.input.eventIds.salesEventId.map(val => val.salesEventId)
            //     );
            // });
        });
        return this;
    }

    selectAllCompsForImport(): FindCompsActions {
        findCompsPage.importCompsSelectButtons.each(el => {
            cy.wrap(el).click();
        });
        return this;
    }

    selectDropdownOptionNewComp(dropdownElement: Cypress.Chainable, title: string): FindCompsActions {
        dropdownElement.click();
        findCompsPage.getDropdownOption(title).click();
        return this;
    }

    clearNumericInputNewComp(inputElement: Cypress.Chainable): FindCompsActions {
        inputElement.clear();
        return this;
    }

    enterNumericInputNewComp(inputElement: Cypress.Chainable, numberOfUnits: number | string): FindCompsActions {
        this.clearNumericInputNewComp(inputElement);
        inputElement.type(`${numberOfUnits}`);
        this.verifyNumericInputNewComp(inputElement, numberOfUnits);
        return this;
    }

    verifyNumericInputNewComp(inputElement: Cypress.Chainable, numberOfUnits: number | string): FindCompsActions {
        const valueToBe = isNumber(numberOfUnits) ? numberWithCommas(`${numberOfUnits}`.replace("-", "")) : "";
        inputElement.should("have.value", valueToBe);
        return this;
    }
}


export default new FindCompsActions(findCompsPage);