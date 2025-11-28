// Teste 2 - Login de terapeuta
describe('Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('permite que um paciente faça login e veja a Home', () => {
    cy.visit('/login');

    cy.get('input[name="username"]').type('erina');
    cy.get('input[name="password"]').type('erina');
    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/home');
    cy.contains(/Meus pacientes/i).should('exist');
  });
});