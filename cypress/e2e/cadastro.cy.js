// Teste 3 - Cadastro de paciente

describe('Fluxo completo de cadastro de paciente', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('permite cadastrar um novo paciente', () => {
    cy.visit('/cadastro');

    cy.get('input[name="nome"]').type('João');
    cy.get('input[name="sobrenome"]').type('Silva');
    cy.get('input[name="cpf"]').type('12345678901');
    cy.get('input[name="dataNascimento"]').type('1990-01-01');
    cy.get('select[name="genero"]').select('Masculino');
    cy.get('input[name="email"]').type('joao.silva@example.com');
    cy.get('input[name="senha"]').type('123456');
    cy.get('input[name="confirmarSenha"]').type('123456');
    cy.contains('button', 'Cadastrar').click();
    
    cy.contains(/cadastro realizado com sucesso/i).should('exist');

    cy.contains('a', 'Voltar para o login').click();
    cy.url().should('include', '/login');

    cy.get('input[name="username"]').type('joao.silva@example.com');
    cy.get('input[name="password"]').type('123456');

    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/home');
    cy.contains(/João Silva/i).should('exist');
  });
});