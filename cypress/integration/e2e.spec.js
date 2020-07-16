function testid(label) {
  return `[data-testid=${label}]`;
}

describe('coding-challenge e2e', () => {
  it('pager navigation', () => {
    cy.visit('/');
    cy.wait(1000);

    cy.get(testid('Paginator-Link-Last')).click();
    cy.url().should('include', 'page=5');

    cy.get(testid('Paginator-Link-First')).click();
    cy.url().should('include', 'page=1');

    cy.get(testid('Paginator-Link-Next')).click();
    cy.url().should('include', 'page=2');

    cy.get(testid('Paginator-Link-Next')).click();
    cy.url().should('include', 'page=3');

    cy.get(testid('Paginator-Link-Next')).click();
    cy.url().should('include', 'page=4');

    cy.get(testid('Paginator-Link-Prev')).click();
    cy.url().should('include', 'page=3');

    cy.get(testid('Paginator-Link-First')).click();
    cy.url().should('include', 'page=1');
  });
});
