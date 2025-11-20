import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      openModal(data: string): void;
      closeModalByBtn(): void;
    }
  }
}
