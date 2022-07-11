import { Sales } from '../../../../actions';
import { _NavigationSection } from '../../../../actions/base';
import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-5134.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5134] Check when "custom" dropdown is selected user can drag&drop comps`, 
{ tags: [ "@sales", "@find_comps", "@comp_plex" ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`
        [QA-5134] -> 
        Verify when “custom” is selected, the user can drag and drop Selected comps up and down in the list. 
        NOTE: The drag and drop functionality is disabled when Sort: Sale Date is selected`
        );

        cy.stepInfo(`1. [QA-5134] -> User navigates to SalesComps Search page `);
        _NavigationSection.navigateToFindComps();
        
        cy.stepInfo(`2. [QA-5134] -> User selects n-first comps from map`);
        [ 0, 1, 2 ].forEach(() => {
            Sales._FindComps.Actions.selectCompFromMap();
        });

        cy.stepInfo(`
        3. [QA-5134] -> When sort for Selected Comparables set to "Sale Date",
        then user unable to sort selected comparables by drag-and-drop
        `);
        /**
         * Check that there are no draggable elements
         */
        // code

        cy.stepInfo(`4. [QA-5134] -> User set "Custom" sort for Selected Comparables`);
        Sales._FindComps.Actions.selectedCompsSetSort("Custom").pause();

        cy.stepInfo(`5.1. [QA-5134] -> User can move selected comparable down the list by drag-and-drop`);
        cy.get('[data-qa="selected-sales-comps-table"] [data-qa="address"]').spread((...comps) => {
            // ernst: removing first undraggable comps from list
            comps.shift();
            comps = comps.map(elem => elem.innerText);
            cy.wrap(comps).as("comps_before");
            cy.get(`@comps_before`).then(val => cy.log(<any>val));

            moveComparableByDnD('[data-react-beautiful-dnd-drag-handle="0"]', 1, "up", 1);        
        });

        cy.get('[data-qa="selected-sales-comps-table"] [data-qa="address"]').spread((...comps) => {
            comps.shift();
            comps = comps.map(elem => elem.innerText);
            cy.wrap(comps).as("comps_after");
            cy.get("@comps_after").then((val) => cy.log(<any>val));
        });

        // deleteReport(testData.reportCreationData.reportNumber);
    });
});

const moveComparableByDnD = (draggableSelector: string, elemIndex = 0, updown: "up" | "down", positionToMove = 1) => {
    const compAlias = "draggableComp";
    const _arrowKey = updown == "up" ? "{upArrow}" : "{downArrow}";
    const _positionToMove = Array(positionToMove).fill(_arrowKey);

    cy.get(draggableSelector).eq(elemIndex).as(compAlias);

    cy.get(`@${compAlias}`)
    .focus()
    .trigger("keydown", { keyCode: 9, force: true })
    .focus()
    .trigger("keydown", { keyCode: 32, force:true })
    .type(`${_arrowKey}`, { force:true })
    .type(`${_positionToMove}`, { force:true, delay: 1500 })
    .wait(1000)
    .trigger("keydown", { keyCode: 32, force:true });
};