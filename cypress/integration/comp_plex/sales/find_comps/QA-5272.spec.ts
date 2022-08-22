import { navigateToCompplex } from "../../../../actions/base/baseTest.actions";
import { Sales, CompPlex } from "../../../../actions";
import mapKeysUtils from "../../../../utils/mapKeys.utils";

describe(`[QA-5272] -> 
[Sales > Find Comps > Edit of the comp] Check that following fields are disabled in the edit mode`, 
{ tags:[ "@comp_plex_standalone" ] }, () => {

    beforeEach(() => {
        navigateToCompplex();
    });

    it(`[QA-5272] -> Check that following fields are disabled in the edit mode`,
        { tags: "@comp-plex-standalone" }, () => {
            // ernst: we can use any address for comp since any comp suite
            Sales._FindComps.selectCompFromMap();
            cy._mapGet(mapKeysUtils.salesCompsAddresses).then(
                addr => CompPlex.Page.getSalesCompDetails(addr.pop()).click()
            );
            
            cy.stepInfo(`1. Verify that the following fields are disabled in the edit mode: 
            Property Information section`);
            Sales._FindComps.Page.propertyInfoEditBtn.should("be.visible").click();
            Sales._FindComps.PropertyInfo.Page.streetAddressInput.should("be.disabled");
            Sales._FindComps.PropertyInfo.Page.cityInput.should("be.disabled");
            Sales._FindComps.PropertyInfo.Page.stateInput.should("be.disabled");
            Sales._FindComps.PropertyInfo.Page.postalCodeInput.should("be.disabled");
            Sales._FindComps.PropertyInfo.Page.propertyIdInput.should("be.disabled");
            Sales._FindComps.PropertyInfo.Page.propertyIdTypeInput.should("be.disabled");
            Sales._FindComps.PropertyInfo.Page.PropertyInfoCancelBtn.click();

            cy.stepInfo(`2. Verify that the following fields are disabled in the edit mode: Sale Information Section`);
            Sales._FindComps.Page.SaleInfoEditBtn.should("be.visible").click();
            Sales._FindComps.SaleInfo.Page.SaleInfoPricePerUnit.should("be.disabled");
            Sales._FindComps.SaleInfo.Page.SaleInfoPricePerSF.should("be.disabled");
        });
});