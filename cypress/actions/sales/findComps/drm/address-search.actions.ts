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

    addCompViaAddressSearch(address: string, index: number) {
        this
            .enterAddressToCompAddress(address)
            .clickSearchCompAddressButton();
        //   cy.wait(`@${Alias.gql.SearchTransactionsByAddresses}`, { timeout:10000 }); 
        findCompsPage.loadingModalSpinner.should('not.exist');
        this.Page.selectCompButton(index).click();
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
    
    addCompByParameter (compIndex: number) { 
        getDataFromDb("latestVersion.saleInformation.saleStatus", "transaction");
        cy.get('@compAlias').then(dataArray => {
            cy.log(dataArray);
            let comp = dataArray[compIndex];
            let { address: { flatValue }, latestVersion: { id }  } = comp;
            let compAddress = flatValue;
            let compId = id;
            cy.log(compAddress, compId);

        } ); 
        return this;
    }

}
export default new AddressSearchActions(findCompsPage);