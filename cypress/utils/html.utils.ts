/**
 * Check whether value in table cell doesn't have decimal part
 */
export const isEndsWithDecimal = (columnIndex:number,valueToContain:string) => {
    cy.get("tr").eq(columnIndex).find("p")
    .contains(valueToContain).then(elem => {
        expect((elem.text().endsWith(".00")),
        "Not ends with decimal part"
        ).to.be.equal(false);
    });
};