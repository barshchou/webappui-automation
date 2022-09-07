/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCompsPage } from "../../../../pages/sales/findComps.page";
import { Alias } from '../../../../utils/alias.utils';
import ComplexDatabaseModule from "../../../../../cypress/db/index";
import mapKeysUtils from "../../../../utils/mapKeys.utils";
import { CompPlex } from "../../../../types/compplex.type";

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
    
    /**
     * Action adds a comp with certain address (@param address) by its id (@param compId) 
     * from the list of comps on address search modal
     */
    
    addCompViaAddressSearchById(address: string, compId: string) {
        this.enterAddressToCompAddress(address)
            .clickSearchCompAddressButton();
        //We should compare comp's id with element attr in future, not with id in response 
        cy.wait(`@${Alias.gql.SearchTransactionsByAddresses}`, { timeout:30000 }).then(({ response }) => {
            expect(response.statusCode).equal(200);
            let compsArrayList = response.body.data.searchTransactionsByAddresses;
            let focusCompIndex = compsArrayList.findIndex(i => i.id === compId);
            cy.log(compsArrayList, focusCompIndex);
            expect(focusCompIndex).to.be.above(-1);
            findCompsPage.loadingModalSpinner.should('not.exist');
            this.Page.selectCompButton(focusCompIndex).click();  
        });
        return this;
    }
  
    /**
     * Action adds a comp by index (@param compIndex) 
     * with necessary property (@param compPropertyKey) value (@param compPropertyValue)
     */
    addCompByParameter (compIndex: number, compProperty: CompPlex.AddressSearch.CompPropertyInDB,
        compPropertyValue: string) { 
        ComplexDatabaseModule.setCompsArrayFromDb(compProperty, compPropertyValue);
        cy._mapGet(mapKeysUtils.arrayOfCompsFromDB).then(dataArray => {
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