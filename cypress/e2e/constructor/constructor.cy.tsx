/// <reference types="cypress" />

describe('constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.visit('http://localhost:4000/');
    cy.wait(['@getUser', '@getIngredients']);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('should display mocked ingredients', () => {
    cy.contains('Краторная булка N-200i').should('be.visible');
  });

  it('should add ingredient and bun to constructor', () => {
    cy.get('[data-testid=1]').find('button').click();
    cy.get('[data-testid=bun-1]').should('have.length', 2);

    cy.get('[data-testid=2]').find('button').click();
    cy.get('[data-testid=ingredient-2]').should('exist');
  });

  it('should open the ingredient modal', () => {
    cy.get('[data-testid=1]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-data"]').should(
      'contain',
      'Краторная булка N-200i'
    );
  });

  it('should close modal by clicking on X', () => {
    cy.get('[data-testid=2]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should close modal by clicking on overlay', () => {
    cy.get('[data-testid=3]').click();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create new order', () => {
    cy.get('[data-testid=1]').find('button').click();
    cy.get('[data-testid=bun-1]').should('have.length', 2);

    cy.get('[data-testid=2]').find('button').click();
    cy.get('[data-testid=ingredient-2]').should('exist');

    cy.get('[data-testid=order-button]').find('button').click();
    cy.wait('@createOrder');

    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="modal-data"]').should('contain', '94810');

    cy.get('[data-testid="modal-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid=bun-1]').should('not.exist');
    cy.get('[data-testid=ingredient-2]').should('not.exist');
  });
});
