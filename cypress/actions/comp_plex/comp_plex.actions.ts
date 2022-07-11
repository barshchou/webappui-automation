import CompPlexBasePage from "../../pages/comp_plex/base.page";

class CompPlexActions{
    public Page: typeof CompPlexBasePage;

    constructor(compplexPage: typeof CompPlexBasePage){
        this.Page = compplexPage;
    }
}

export default new CompPlexActions(CompPlexBasePage);