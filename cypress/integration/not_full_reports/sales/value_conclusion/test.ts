describe('Custom Cypress errors', () => {
    before(() => {
      // Go to qacourse.dev
      cy.visit('https://www.qacourse.dev');
    });
  
    it('Go to Articles from Homepage', () => {
      // In the navigation get the Articles link
      cy
        .get('nav[role="navigation"]')
        .contains('Articles')
        .as('articleslink');
  
      // Assert the link is visible
      cy
        .get('@articleslink')
        .should('be.visible');
  
      // Click on the link
      cy
        .get('@articleslink')
        .click();
  
      // Assert the url path has changed to /articles
      cy.location().should(loc => {
        expect(loc.pathname).to.eq('/articles123');
      });
    });
  });