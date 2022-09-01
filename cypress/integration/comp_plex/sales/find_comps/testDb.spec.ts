import { data } from "cypress/types/jquery";
import { getDataFromDb } from "../../../../../cypress/db/index";
import Sales from "../../../../actions/sales/sales.manager";

describe('describe', () => {
    
    it('it', () => {
        cy.log('test start');
        
        Sales.FindComps.AddressSearch.addCompByParameter(0);
         


    });
});