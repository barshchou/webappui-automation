import { Tag } from "../../utils/tags.utils";
import { getEnvUrl } from "../../../utils/env.utils";
import HomepageActions from "../../actions/base/homepage.actions";

describe("Check if user can login", { tags: [ Tag.smoke ] }, () => {

    it("Test body", () => {
        cy.loginByUI(getEnvUrl());
        HomepageActions.Page.createReportButton.should("exist").and("be.visible");
    });
});