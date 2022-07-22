import BasePage from "../base/base.page";

class Certification extends BasePage {
   
    certificateBulletsPoint(index = 1) { return cy.xpath(`//*[.='We certify to the best of our knowledge:']//following::li[${index}]`); }
}
export default new Certification();
