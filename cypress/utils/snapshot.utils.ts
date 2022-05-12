/* eslint-disable @typescript-eslint/ban-ts-comment */
const pathToSnapshots = "./cypress/gh_artifacts/dom_snapshots";

/**
 * Internal Cypress method from source code.
 * Helping to record snapshots with inlined CSS (without it - snapshots would be without CSS)
 */
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

/**
 * Internal Cypress method from source code.
 * Helping to append style tag in DOM snapshots
 */
function _styleTag (style) {
    return `<style>${style}</style>`;
}

/**
 * Record DOM snapshot into file. Basically, the thing which Cypress creates on every command 
 * executed in your test. But with "little" hacks - we retrieve snapshots from browser 
 * and recording into filesystem with internal Cypress methods.
 * TODO: Describe Cypress hacks in Readme in "Hacks" section
 */
export const recordDOM_Snapshot = () => {
    // @ts-ignore
    Cypress.Commands._commands.log.fn("Recording DOM snapshot to file");
    // @ts-ignore
    const snap = Cypress.cy.createSnapshot("snap");
    // @ts-ignore
    const { headStyles } = Cypress.cy.getStyles(snap);
    // @ts-ignore
    const $head = Cypress.$autIframe.contents().find("head");
    $head.find("script").empty();
    const existingStyles = $head.find('link[rel="stylesheet"],style');

    headStyles.forEach((style, index) => {
        if(style.href){
            //
        }
        else{
            _replaceStyle($head, existingStyles[index], style);
        }
    });
    
    const XMLS = new XMLSerializer();
    // @ts-ignore
    let s ='<html>\n' + XMLS.serializeToString(Cypress.$autIframe.contents().find('head')[0]);
    s += XMLS.serializeToString(snap.body.get()[0]) + '\n</html>\n';
   
    // first way
    // Cypress.Commands._commands.writeFile.fn(`${Cypress.spec.name}.html`,s);

    // second way
    // @ts-ignore
    Cypress.backend('write:file', `${pathToSnapshots}/${Cypress.spec.name}.html`, s);
};