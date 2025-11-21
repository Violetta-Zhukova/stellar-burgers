/// <reference types="cypress" />
import type {} from '../../support/cypress';

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

    cy.visit('/');
    cy.wait(['@getUser', '@getIngredients']);

    cy.get('[data-testid=1]').as('testBun');
    cy.get('[data-testid=2]').as('testIngredient');
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
    cy.get('@testBun').find('button').click();
    cy.get('[data-testid=bun-1]').should('have.length', 2);

    cy.get('@testIngredient').find('button').click();
    cy.get('[data-testid=ingredient-2]').should('exist');
  });

  it('should open the ingredient modal', () => {
    cy.get('@testBun').click();
    cy.openModal('Краторная булка N-200i');
  });

  it('should close modal by clicking on X', () => {
    cy.get('@testIngredient').click();
    cy.openModal('Биокотлета из марсианской Магнолии');
    cy.closeModalByBtn();
  });

  it('should close modal by clicking on overlay', () => {
    cy.get('@testIngredient').click();
    cy.openModal('Биокотлета из марсианской Магнолии');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('should create new order', () => {
    cy.get('@testBun').find('button').click();
    cy.get('[data-testid=bun-1]').as('constructorBun').should('have.length', 2);

    cy.get('@testIngredient').find('button').click();
    cy.get('[data-testid=ingredient-2]')
      .as('constructorIngredient')
      .should('exist');

    cy.get('[data-testid=order-button]').find('button').click();
    cy.wait('@createOrder');

    cy.openModal('94810');
    cy.closeModalByBtn();

    cy.get('@constructorBun').should('not.exist');
    cy.get('@constructorIngredient').should('not.exist');
  });
});
