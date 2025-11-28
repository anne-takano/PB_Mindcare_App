// Teste 1 - Login de paciente
describe('Login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('permite que um paciente faça login e veja a Home', () => {
    cy.visit('/login');

    cy.get('input[name="username"]').type('a');
    cy.get('input[name="password"]').type('a');
    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/home');
    cy.contains(/Buscar terapeutas/i).should('exist');
  });
});