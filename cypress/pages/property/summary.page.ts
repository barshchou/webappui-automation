import Enums from "../../enums/enums";
import BasePage from "../base/base.page";

class PropertySummaryPage extends BasePage {
    get headerSection() {return cy.get("*[data-qa='summary']");}

    get numberOfResUnitsInput() {return cy.get("*[name='residentialUnitCount']");}

    get numberOfCommercialUnitsInput() {return cy.get("*[name=commercialUnitCount]");}

    get currentNumberOfCommercialUnitsInput() {return cy.get("*[name='current.commercialUnitCount']");}

    get buildingNameInput() { return cy.get(`[name='buildingName']`); } 

    get siteAreaInput() { return cy.get(`[name='siteArea']`); }

    resUnitsInputValidationText(text: string) {return cy.xpath(`//*[contains(@name, 'residentialUnitCount')]//following::*[contains(text(), '${text}')][1]`);}

    commercialUnitsInputValidationText(text: string) {return cy.xpath(`//*[contains(@name, 'commercialUnitCount')]//following::*[contains(text(), '${text}')][1]`);}

    get censusTractField() {return cy.get("*[name=censusTract]");}

    censusTractFieldValidationText(text: string) {return cy.xpath(`//*[contains(@name, 'censusTract')]//following::*[contains(text(), '${text}')][1]`);}

    get buildingDescriptor() {return cy.get("*[name=buildingDescriptor]");}

    get streetAddress() {return cy.get("*[name=streetAddress]");}

    get streetName() {return cy.get("*[name=streetName]");}

    get propertyIdentifierType() {return cy.get("*[name=propertyIdentifierType]");}

    get propertyIdentifier() {return cy.get("*[name=propertyIdentifier]");}

    get yearBuilt() {return cy.get("*[name=yearBuilt]");}

    get siteArea() {return cy.get("*[name=siteArea]");}

    get grossBuildingArea() {return cy.get("*[name=grossBuildingArea]");}
    
    get floorsNumber() {return cy.get("*[name=floors]");}

    get walkUpTypeButtons() {return cy.get("*[data-qa=walk-up-btn]");}

    get currentGrossBuildingArea() {return cy.get("*[name='current.grossBuildingArea']");}
    
    get currentNumberOfResUnits() {return cy.get("*[name='current.residentialUnitCount']");}

    get currentFloorsNumber() {return cy.get("*[name='current.floors']");}

    get editCommentaryButtons() {return cy.get("*[data-icon='pencil']");}

    get textBox() {return cy.get("*[role=textbox]");}

    get saveExportEditButton() {return cy.xpath("//button[.='Save'][not(@data-qa='form-save-btn')]");}

    getRadioSquareFootAnalysis(radio = Object.keys(Enums.PROPERTY_SQUARE_FOOT_ANALYSIS)[0]) {return cy.get(`[data-qa='basisForSFAnalysis-radio-group'] [value='${radio}']`);}

    getCheckedSquareFootAnalysis(number = 0) {return cy.get("[data-qa='basisForSFAnalysis-radio-group'] label").eq(number).children().eq(0);}

    get basisForSFAnalysisInput() {return cy.get("[name='basisForSFAnalysisValue']");}

}

export default new PropertySummaryPage();