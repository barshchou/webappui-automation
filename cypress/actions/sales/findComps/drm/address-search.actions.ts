/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCompsPage } from "../../../../pages/sales/findComps.page";
import { Alias } from '../../../../utils/alias.utils';
import ComplexDatabaseModule from "../../../../../cypress/db/index";
import { Filter } from "mongodb";
import Enums from "../../../../enums/enums";

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
     * Action adds a comp with certain address by its id from the list of comps on address search modal
     * @param address Comp address
     * @param compId Comp id (retrieved from database)
     */
    addCompViaAddressSearchById(address: string, compId: string) {
        this.enterAddressToCompAddress(address)
            .clickSearchCompAddressButton();
        //We should compare comp's id with element attr in future, not with id in response 
        cy.wait(`@${Alias.gql.SearchTransactionsByAddresses}`, { timeout:30000 }).then(({ response }) => {
            expect(response.statusCode).equal(200);
            let compsArrayList = response.body.data.searchTransactionsByAddresses;
            let focusCompIndex = compsArrayList.findIndex(comp => comp.id === compId);
            cy.log(`List of comps`, compsArrayList);
            cy.log(`Index of necessary comp is ${focusCompIndex}`);
            //If comp wasn't found, then focusCompIndex will be equal -1. The assertion error will be thrown.
            expect(focusCompIndex).to.be.above(-1);
            this.Page.selectCompButton(focusCompIndex).should('exist').click();  
        });
        return this;
    }
  
    /**
     * Look up for sales comps in database, extracts its FLAT_VALUE 
     * and then adds sales comps through Address Search with FLAT_VALUE
     * @param filter The filter predicate for mongo `find` method. 
     * If unspecified, then all documents in the collection will match the predicate 
     * @see https://mongodb.github.io/node-mongodb-native/4.10/classes/Collection.html#find
     * @param index number of element to be retrieved from array. If not set - will retrieve first elem
     */
    addCompByParameter (filter: Filter<object>, index = 0) {
        cy.log(`Using filter ${JSON.stringify(filter)} to query data from db`); 
        ComplexDatabaseModule.getCompsArrayFromDb(filter).then(dataArray => {
            cy.log(`Array of comps in database`, <string>dataArray);
            let comp = dataArray[index];
            let { address: { flatValue }, id } = <any>comp;
            let compAddress = flatValue;
            let compId = id;
            cy.log(`Address of necessary comp is ${compAddress}, and its id is ${compId}`);
            this.addCompViaAddressSearchById(compAddress, compId);
            cy._mapSet(Alias.salesCompsEventIds, compId);
        }); 
    
        return this;
    }

    getCompSaleDateBySalesId(compId: string, index = 0): this { 
        const filter = { $or: [ { 
            [ Enums.COMP_PROPERTIES_PATHS_DB.compPropertyPathsInDB.saleTransactionId ]: compId 
        } ] };
        ComplexDatabaseModule.getCompsArrayFromDb(filter).then(dataArray => {
            cy.log(`Comp Sale Date is ${dataArray[0].saleDate}`);
            cy._mapSet(`${Alias.compProperties.saleDate}${index}`, dataArray[0].saleDate);
        } ); 
        return this;
    }
}
export default new AddressSearchActions(findCompsPage);