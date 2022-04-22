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

/**
 * WARN: needs to be put in `after` hook in describe
 */
export const recordDOM_Snapshot = () => {
    if(Cypress.state()?.error != undefined){
        cy.document().then(() => {
            const snap = cy.createSnapshot("snap");
            const { headStyles } = Cypress.cy.getStyles(snap);
            const $head = Cypress.$autIframe.contents().find("head");
            $head.find("script").empty();
            const existingStyles = $head.find('link[rel="stylesheet"],style');

            headStyles.forEach((style,index) => {
                if(style.href){
                    //
                }
                else{
                    _replaceStyle($head,existingStyles[index],style);
                }
            });
            
            const XMLS = new XMLSerializer();
            let s ='<html>\n' + XMLS.serializeToString(Cypress.$autIframe.contents().find('head')[0]);
            s += XMLS.serializeToString(snap.body.get()[0]) + '\n</html>\n';
            cy.writeFile(`./cypress/dom_snapshots/${Cypress.spec.name}.html`,s);
        });   
    }
};