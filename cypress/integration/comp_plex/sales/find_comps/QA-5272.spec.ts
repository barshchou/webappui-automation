import { salesInterceptions } from "../../../../actions/base/baseTest.actions";
import { Sales, CompPlex } from "../../../../actions";
import testData from "../../../../fixtures/comp_plex/sales/find_comps/QA-5272.fixture";

describe("[QA-5272]", () => {

    beforeEach(() => {
        /**
         * ernst: this tests should run only on standalone comp_plex 
         * (localhost or client's url whatever)
         * remove this comment when we figure out how to manage such test runs
         */
        salesInterceptions();
        cy.visit("/");
    });

    it(`[Sales > Find Comps > Edit of the comp] 
    Check that following fields are disabled in the edit mode `,
    { tags: "@comp-plex-standalone" }, () => {
        Sales._FindComps.selectCompFromMapByAddress(testData.address);
        CompPlex.Page.getSalesCompDetails(testData.address).click();
        
        Sales._FindComps.Page.propertyInfoEditBtn.should("be.visible").click();
        Sales._FindComps.Page.streetAddressInput.should("be.disabled");
        Sales._FindComps.Page.cityInput.should("be.disabled");
        Sales._FindComps.Page.stateInput.should("be.disabled");
        Sales._FindComps.Page.postalCodeInput.should("be.disabled");
        Sales._FindComps.Page.propertyIdInput.should("be.disabled");
        Sales._FindComps.Page.propertyIdTypeInput.should("be.disabled");
    });
});