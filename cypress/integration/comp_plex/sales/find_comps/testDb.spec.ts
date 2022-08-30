import { getDataFromDb } from "../../../../../cypress/db/index";

describe('describe', () => {
    
    it('it', () => {
        cy.log('test start');
        // cy.task('getDataFromDb').then(data => cy.log(data));
        getDataFromDb();
    });
});