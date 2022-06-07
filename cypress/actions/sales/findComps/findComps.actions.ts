import { findCompsPage } from "../../../pages/sales/findComps.page";
import { getUploadFixture } from "../../../../utils/fixtures.utils";
import { isNumber, numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import saleInfoFormActions from "./drm/saleInfoForm.actions";
import propertDescActions from "./drm/propertyDescForm.actions";
import propertyInfoFormActions from "./drm/propertyInfoForm.actions";
import { Alias } from "../../../utils/alias.utils";

class FindCompsActions extends BaseActionsExt<typeof findCompsPage> {

    get SaleInfo(){
        return saleInfoFormActions;
    }

    get PropertyDesc(){
        return propertDescActions;
    }

    get PropertyInfo(){
        return propertyInfoFormActions;
    }

    addExistingComparable(address: string): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.getSelectCompButtonByAddress(address).click();
        return this;
    }

    clickCreateCompButton(): FindCompsActions {
        findCompsPage.createCompButton.click();
        return this;
    }

    enterCompAddressToSearch(address: string): FindCompsActions {
        findCompsPage.searchCompAddressInput.type(address).type("{enter}");
        findCompsPage.findCompField.click();
        return this;
    }

    clickSearchCompButton(): FindCompsActions {
        findCompsPage.submitButton.click();
        return this;
    }

    openAddNewComparableFormSearchResult(address: string, searchResultIndex = 0): FindCompsActions {
        this.clickCreateCompButton()
            .enterCompAddressToSearch(address)
            .clickSearchCompButton();
        findCompsPage.createCompSearchResults.eq(searchResultIndex).click();
        findCompsPage.createNewCompButton.click();
        return this;
    }

    verifyAddedCompAddress(address: string): FindCompsActions {
        this.verifyProgressBarNotExist();
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).should("exist");
        return this;
    }


    clickImportComparableButton(): FindCompsActions {
        findCompsPage.importCompsButton.click();
        return this;
    }

    verifyImportCompModalShown(): FindCompsActions {
        findCompsPage.importCompModal.should("be.visible");
        return this;
    }

    uploadComps(filePath: string): FindCompsActions {
        findCompsPage.csvInput.attachFile(getUploadFixture(filePath));
        return this;
    }

    verifyComparablesNumber(number: number): FindCompsActions {
        const numberToBe = number + 1;
        findCompsPage.addressCells.should("have.length", numberToBe);
        return this;
    }

    /**
     * ernst: WARN: this method needs to be refactored
     * we need to create workaround for shadow-dom elements, which dynamically rendered
     * during some action (scrolling the list, for example).
     * if you try to do this manually - you probably get the error `doc.createTreeWalker is not a function`
     */
    selectCompFromMapByAddress(address: string): FindCompsActions {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).scrollIntoView().click({ force: true });
        this.checkFindSingleSalesComp();
        return this;
    }

    checkFindSingleSalesComp(){
        cy.wait(`@${Alias.gql.FindTransactionByIdAndVersion}`, { timeout:70000 }).then((interception) => {
            cy.log(interception.response.body.data.findTransactionByIdAndVersion.salesEventId);
            cy.wrap(interception.response.body.data.findTransactionByIdAndVersion.salesEventId)
            .as(Alias.salesEventId);
        });
        return this; 
    }

    removeCompByAddress(address: string): FindCompsActions {
        findCompsPage.getRemoveSelectedCompButtonByAddress(address).click();
        return this;
    }

    verifyCompIsInRemovedSection(address: string): FindCompsActions {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).should("exist");
        return this;
    }

    verifyCompIsInMap(address: string): FindCompsActions {
        findCompsPage.getSelectCompFromMapButtonByAddress(address).should("exist");
        return this;
    }

    removeDeletedCompByAddress(address: string): FindCompsActions {
        findCompsPage.getRemoveDeletedCompButtonByAddress(address).click();
        return this;
    }

    enterReportToSearchComp(reportID: string): FindCompsActions {
        cy.intercept("GET", `/salesComps/eventIds/${reportID}`)
        .as(Alias.salesComps_eventIds);
        findCompsPage.reportToSearchCompInput.type(reportID).should("have.value", reportID);
        return this;
    }

    clickImportCompsFromReportButton(): FindCompsActions {
        findCompsPage.importReportCompsButton.click();
        return this;
    }

    clickSearchButton(): FindCompsActions {
        findCompsPage.searchButton.click();
        return this;
    }

    /**
     * Checks WebApp REST request /salesComps/eventIds/:report_id
     * which returns salesEventId which in its turn will be passed to DRM's GraphQL API
     */
    checkSingleSalesCompsByEventId(): this{
        cy.wait(`@${Alias.salesComps_eventIds}`).then(({ response }) => {
            cy.get(`@${Alias.salesEventId}`).then(_salesEventId => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let arr: Array<any>  = response.body.selectedEventIds;
                expect(arr.find(val => val.salesEventId == _salesEventId))
                .not.to.be.undefined;
            });
        });
        return this;
    }

    /**
     * Checks `findSalesCompsByEventIds` gql operation whether its response has correct salesEventId ("salesCompId")
     */
    checkSelectedSingleSalesComps() {
        cy.wait(`@${Alias.gql.FindSalesCompsByEventIds}`).then(({ request, response }) => {
            let req: Utils.GraphQLRequest = request.body;
            expect(req.operationName).to.equal("findSalesCompsByEventIds");
            cy.get(`@${Alias.salesEventId}`).then(_salesEventId => {
                expect(_salesEventId).to.be.oneOf(
                    response.body.data.findSalesCompsByEventIds.map(val => val.salesEventId)
                );
            });
        });
        return this;
    }

    selectAllCompsForImport(): FindCompsActions {
        findCompsPage.importCompsSelectButtons.each(el => {
            cy.wrap(el).click();
        });
        return this;
    }

    selectDropdownOptionNewComp(dropdownElement: Cypress.Chainable, title: string): FindCompsActions {
        dropdownElement.click();
        findCompsPage.getDropdownOption(title).click();
        return this;
    }

    clearNumericInputNewComp(elementAlias: string): FindCompsActions {
        cy.get(`@${elementAlias}`).clear({ force: true });
        return this;
    }

    enterNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        this.clearNumericInputNewComp(elementAlias);
        cy.get(`@${elementAlias}`).realClick();
        cy.get(`@${elementAlias}`).realType(`${numberOfUnits}`, { pressDelay:45, delay: 50 });
        this.verifyNumericInputNewComp(elementAlias, numberOfUnits);
        return this;
    }

    verifyNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        const valueToBe = isNumber(numberOfUnits) ? numberWithCommas(`${numberOfUnits}`.replace("-", "")) : "";
        cy.get(`@${elementAlias}`).should("have.value", valueToBe);
        return this;
    }
}


export default new FindCompsActions(findCompsPage);