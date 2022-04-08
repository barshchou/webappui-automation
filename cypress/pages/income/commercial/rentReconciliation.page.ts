import BasePage from "../../base/base.page";

class RentReconciliationPage extends BasePage {
   get RentReconcillationHeader(){
       return cy.get('[data-qa="rentReconciliation"]');
   }

   get GeneratedCommentary(){
       return cy.get('[data-qa="commercialRentCompsReconciliationDiscussion.commentary-generated-text"]');
   }
}

export default new RentReconciliationPage();