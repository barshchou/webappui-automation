/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCompsPage } from "../../../../pages/sales/findComps.page";
import { Alias } from '../../../../utils/alias.utils';
import { getDataFromDb } from "../../../../../cypress/db/index";

class AddressSearchActions {
    Page: typeof findCompsPage;

    constructor(page: typeof findCompsPage) {
        this.Page = page;
    }

    openAddressSearchTab() {
        findCompsPage.addressSearchTab.click();
        this.Page.compAddressInput.should('exist');
        return this;
    }

    enterAddressToCompAddress(address: string) {
        findCompsPage.compAddressInput.should('exist')
            .should('be.enabled')            
            .realClick({ clickCount: 2 })
            .focus()
            .clear()
            .focus()
            .type(address)
            .focus()
            .type("{enter}")
            .should("have.value", address);
        return this;
    }

    clickSearchCompAddressButton() {
        this.Page.searchCompAddressButton.should('exist')
            .should('be.enabled').click();
        return this;
    }
    
    addCompViaAddressSearchById(address: string, compId: string) {
        this
            .enterAddressToCompAddress(address)
            .clickSearchCompAddressButton();
        cy.wait(`@${Alias.gql.SearchTransactionsByAddresses}`, { timeout:10000 }).then(({ response }) => {
            expect(response.statusCode).equal(200);
            let compsArrayList = response.body.data.searchTransactionsByAddresses;
            let focusCompIndex = compsArrayList.findIndex(i => i.id === compId);
            cy.log(compsArrayList, focusCompIndex);
            findCompsPage.loadingModalSpinner.should('not.exist');
            this.Page.selectCompButton(focusCompIndex).click();
        });
        return this;
    }

    addCompByParameter (compIndex: number, compPropertyKey: string, compPropertyValue: string) { 
        getDataFromDb(compPropertyKey, compPropertyValue);
        cy.get('@compAlias').then(dataArray => {
            cy.log(<any>dataArray);
            let comp = dataArray[compIndex];
            let { address: { flatValue }, id } = <any>comp;
            let compAddress = flatValue;
            let compId = id;
            cy.log(compAddress, compId);
            this.addCompViaAddressSearchById(compAddress, compId);
        } ); 
        return this;
    }

}
export default new AddressSearchActions(findCompsPage);