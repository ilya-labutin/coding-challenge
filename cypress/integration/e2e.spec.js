function testid(label) {
  return `[data-testid=${label}]`;
}

describe('coding-challenge e2e', () => {
  // it('pager navigation', () => {
  //   cy.visit('/');
  //   cy.wait(1000);

  //   cy.get(testid('Paginator-Link-Last')).click();
  //   cy.url().should('include', 'page=5');

  //   cy.get(testid('Paginator-Link-First')).click();
  //   cy.url().should('include', 'page=1');

  //   cy.get(testid('Paginator-Link-Next')).click();
  //   cy.url().should('include', 'page=2');

  //   cy.get(testid('Paginator-Link-Next')).click();
  //   cy.url().should('include', 'page=3');

  //   cy.get(testid('Paginator-Link-Next')).click();
  //   cy.url().should('include', 'page=4');

  //   cy.get(testid('Paginator-Link-Prev')).click();
  //   cy.url().should('include', 'page=3');

  //   cy.get(testid('Paginator-Link-First')).click();
  //   cy.url().should('include', 'page=1');
  // });

  it('resolving and blocking', () => {
    cy.visit('/?page=1');
    cy.wait(1000);

    cy.contains('Block').click().should('be.disabled');
    cy.contains('BLOCKED');

    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-Page-2')).click();
    cy.url().should('include', 'page=2');
    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-Page-1')).click();
    cy.url().should('include', 'page=1');
    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-Page-5')).click();
    cy.url().should('include', 'page=5');
    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-Page-4')).click();
    cy.url().should('include', 'page=4');
    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-Page-2')).click();
    cy.url().should('include', 'page=2');
    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-Page-3')).click();
    cy.url().should('include', 'page=3');
    cy.contains('Resolve').click();

    cy.get(testid('Paginator-Link-First')).click();
    cy.url().should('include', 'page=1');

    cy.get(testid('Paginator-Link-Last')).click();
    cy.url().should('include', 'page=4');
  });
});
