import BasePage from "../base/base.page";

class Certification extends BasePage {
   
    certificateBulletsPoint(index = 0) { 
        return cy.xpath(`//*[.='We certify to the best of our knowledge:']//following::li`).eq(index); 
    }
}
export default new Certification();
