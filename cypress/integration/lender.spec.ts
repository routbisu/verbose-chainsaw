context('Home Page', () => {
  before(() => {
    cy.fixture('lenders').then((lenders: LenderFixture) => {
      this.lenders = lenders;
    });
  });

  beforeEach(() => {
    const host = Cypress.config()['host'];
    cy.visit(host);
  });

  it(`will navigate to the lender's page`, () => {
    const lenderSlug = this.lenders[1].slug;
    cy.get(`[data-testid="${lenderSlug}"]`).click();
  });

  it(`will fill the form with random values and submit`, () => {
    const host = Cypress.config()['host'];
    const { slug, initialValues } = this.lenders[1];

    cy.visit(`${host}/${slug}`);

    // Type test into all inputs
    Object.keys(initialValues).forEach((fieldName) => {
      cy.get(`[data-testid='${fieldName}']`).find('input').type('Test');
    });

    // Click on the submit button
    cy.get(`[data-testid='submit']`).click();

    // Check if a decision is recieved
    cy.get(`[data-testid='decision']`).should('contain', `You've been`);
  });
});
