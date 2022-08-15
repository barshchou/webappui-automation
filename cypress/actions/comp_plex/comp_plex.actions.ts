import CompPlexBasePage from "../../pages/comp_plex/base.page";

class CompPlexActions {
    public Page: typeof CompPlexBasePage;

    get Actions() {
        return this;
    }

    constructor(compplexPage: typeof CompPlexBasePage) {
        this.Page = compplexPage;
    }

    createComp() {
        this.Page.btnCreateComp.should("exist").click();
        return this;
    }
}

export default new CompPlexActions(CompPlexBasePage);