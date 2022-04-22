//@ts-ignore

import testData from "../../../../../fixtures/not_full_reports/income/commercial/in_place_rent_roll/QA-4322.fixture";
import NavigationSection from "../../../../../actions/base/navigationSection.actions";
import Income from "../../../../../actions/income/income.manager";
import {createReport, deleteReport} from "../../../../../actions/base/baseTest.actions";
import homepagePage from "../../../../../pages/base/homepage.page";

function _replaceStyle ($head, existingStyle, style) {
    const styleTag = _styleTag(style);

    if (existingStyle) {
      Cypress.$(existingStyle).replaceWith(styleTag);
    } else {
      // no existing style at this index, so no more styles at all in
      // the head, so just append it
      $head.append(styleTag);
    }
}

function _styleTag (style) {
    return `<style>${style}</style>`;
}



describe("Verify the Basis of Rent tooltip", () => {
    before("Login, create report", () => {
        cy.login();
        homepagePage.newReportButton.should("be.visible");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        deleteReport(testData.reportCreationData.reportNumber);
        cy.log("test");
        NavigationSection.verifyProgressBarNotExist();
        cy.get('[data-qa="create-report-btn"]').then(elem => {
            
            const snap = cy.createSnapshot("snap");
            const { headStyles } = Cypress.cy.getStyles(snap);
            // console.log(headStyles);
            const $head = Cypress.$autIframe.contents().find("head");
            $head.find("script").empty();
            const existingStyles = $head.find('link[rel="stylesheet"],style');
            console.log(existingStyles);
            headStyles.forEach((style,index) => {
                if(style.href){
                    //
                }
                else{
                    _replaceStyle($head,existingStyles[index],style);
                }
            });
            const XMLS = new XMLSerializer();
            let s =
            '<html>\n' + 
            XMLS.serializeToString(Cypress.$autIframe.contents().find('head')[0]);
            s += XMLS.serializeToString(snap.body.get()[0]) + '\n</html>\n';
            cy.writeFile("./snap.html",s);
            cy.log(Cypress.ProxyLogging.proxyRequests.map(proxReq => {
                return proxReq.consoleProps;
            }));
        });
        // cy.get("html").then(html=>{
        //     cy.writeFile("./body.html",html.html());
        // });
    });
});