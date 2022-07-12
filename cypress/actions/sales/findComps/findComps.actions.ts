import { findCompsPage } from "../../../pages/sales/findComps.page";
import { getUploadFixture } from "../../../../utils/fixtures.utils";
import { isNumber, numberWithCommas } from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";
import saleInfoFormActions from "./drm/saleInfoForm.actions";
import propertDescActions from "./drm/propertyDescForm.actions";
import propertyInfoFormActions from "./drm/propertyInfoForm.actions";
import { Alias, gqlOperationNames } from "../../../utils/alias.utils";
import { Utils } from "../../../types/utils.type";
import { _map } from "../../../support/commands";
import { recurse } from "cypress-recurse";
import mapKeysUtils from "../../../utils/mapKeys.utils";

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

    selectCompFromMapByAddress(address: string): FindCompsActions {
        recurse(
            () => _scrollAndSearchComp(address), 
            () => _map.get(mapKeysUtils.search_result_sales_comp) != undefined, { delay: 2000, timeout: 60000 }
        );
        findCompsPage.getSelectCompFromMapButtonByAddress(address).scrollIntoView().click({ force: true });
        this.checkFindSingleSalesComp();
        // ernst: delay to not accidentaly dispatch click to "Remove" btn on SearchList
        cy.wait(1500);
        return this;
    }

    /**
     * Selects first sales comp from search results.
     * Useful when we need to select n-random sales comps
     * @param index number of sales comp in search list
     */
    selectCompFromMap(index = 0): FindCompsActions {
        findCompsPage.getSelectCompFromMapButton().eq(index).scrollIntoView().click({ force: true });
        this.checkFindSingleSalesComp();
        // ernst: delay to not accidentaly dispatch click to "Remove" btn on SearchList
        cy.wait(1500);
        return this;
    }

    checkFindSingleSalesComp(): FindCompsActions{
        cy.wait(`@${Alias.gql.FindTransactionByIdAndVersion}`, { timeout:70000 }).then((interception) => {
            cy.log(interception.response.body.data.findTransactionByIdAndVersion.id);
            if(_map.get(mapKeysUtils.sales_comps_ids) == undefined){
                let arr = [ interception.response.body.data.findTransactionByIdAndVersion.id ];
                _map.set(mapKeysUtils.sales_comps_ids, arr);
            }
            else{
                cy._mapGet(mapKeysUtils.sales_comps_ids).then(arr => {
                    return arr.push(interception.response.body.data.findTransactionByIdAndVersion.id);
                });
            }
            cy.wrap(interception.response.body.data.findTransactionByIdAndVersion.id)
            .as(Alias.salesEventId);
            cy._mapGet(mapKeysUtils.sales_comps_ids).then(arr => cy.log("Sales_IDs array: "+arr));
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
        findCompsPage.importReportCompsButton.should("be.visible").click();
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
    checkSingleSalesCompsByEventId(): FindCompsActions{
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
     * Checks `findTransactionsByIdsAndVersions` gql operation whether its response has correct salesEventId ("salesCompId")
     * 
     * TODO: [QA-6132] Add assertion on salesEventId
     */
    checkSelectedSingleSalesComps() {
        cy.wait(`@${Alias.gql.FindTransactionsByIdsAndVersions}`).then(({ request, response }) => {
            let req: Utils.GraphQLRequest = request.body;
            expect(req.operationName).to.equal(gqlOperationNames.findTransactionsByIdsAndVersions);
            cy.log(response.body.data.findTransactionsByIdsAndVersions.map(e => e.id));
            expect(response.body.data.findTransactionsByIdsAndVersions.map(e => e.id))
            .to.include.members(_map.get(mapKeysUtils.sales_comps_ids));
        });
        cy.pause();
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
        findCompsPage.getDropdownOption(title).click({ force: true });
        return this;
    }

    clearNumericInputNewComp(elementAlias: string): FindCompsActions {
        cy.get(`@${elementAlias}`, { includeShadowDom: true }).clear({ force: true });
        return this;
    }

    enterNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        this.clearNumericInputNewComp(elementAlias);
        
        // ernst: little hack to work with commercialAreaNewComp input due its specific behaviour
        if(elementAlias != Alias.pageElements.comp_plex.commercialAreaNewComp){
            cy.get(`@${elementAlias}`, { includeShadowDom: true }).realClick();
        }
        else{
            cy.get(`@${elementAlias}`, { includeShadowDom: true }).focus();
        }
        cy.get(`@${elementAlias}`, { includeShadowDom: true }).realType(`{enter}${numberOfUnits}`, { pressDelay:45, delay: 50 });
        this.verifyNumericInputNewComp(elementAlias, numberOfUnits);
        return this;
    }

    verifyNumericInputNewComp(elementAlias: string, numberOfUnits: number | string): FindCompsActions {
        const valueToBe = isNumber(numberOfUnits) ? numberWithCommas(`${numberOfUnits}`.replace("-", "")) : "";
        cy.get(`@${elementAlias}`, { includeShadowDom: true, timeout: 10000 }).should("have.value", valueToBe);
        return this;
    }
}


export default new FindCompsActions(findCompsPage);

/**
 * list of elems -> iterate over it 
 * -> if elem includes address = record it to map 
 * | if list over -> scroll to the last elem of the list
 * 
 * Run this function using cypress-recurse 
 */
const _scrollAndSearchComp = (compAddress:string) => {
    return cy.get('[aria-label="grid"] > div > div', { includeShadowDom: true }).each((elem, index, list) => {
        if(elem.text().includes(compAddress)){
            cy.log(`Found SalesComps in next list ${list} with index ${index}`);
            _map.set(mapKeysUtils.search_result_sales_comp, elem);
            return;
        }
        else if(list.length == index+1){
            if(_map.get(mapKeysUtils.search_result_sales_comp) == undefined){
                cy.log("Scrolling to last comp in to continue search");
                cy.wrap(elem).scrollIntoView();
                return;
            }
            return;
        }
    });
};