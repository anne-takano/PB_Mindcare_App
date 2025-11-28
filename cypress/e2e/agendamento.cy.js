// Teste 4 - Agendamento de consulta

describe('Fluxo completo de agendamento', () => {
  before(() => {
    cy.clearLocalStorage();
  });

  it('permite que paciente marque e terapeuta veja o agendamento', () => {
    // 1 - Login paciente
    cy.visit('/login');

    cy.get('input[name="username"]').type('a');
    cy.get('input[name="password"]').type('a');
    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/home');
    cy.contains(/Buscar terapeutas/i).should('exist');

    // 2 - Buscar terapeuta Erina
    cy.contains(/Buscar terapeutas/i).click();
    cy.url().should('include', '/buscar-terapeutas');
    cy.contains(/Erina/i).scrollIntoView();

    // 3 - Selecionar horário e marcar
    cy.get('[data-testid="therapist-card-2"]').within(() => {
      cy.contains('button', /08:00/i).click();
      cy.contains('button', /marcar consulta/i).click();
    });

    // 4 - Verificar que o agendamento aparece para o paciente
    cy.url().should('include', '/consultar-agendamentos');
    cy.contains(/horário selecionado/i).should('exist');

    // 5 - Logout paciente (via BottomNav)
    cy.contains('span', /sair/i).click();
    cy.url().should('include', '/login');

    // 6 - Login terapeuta
    cy.get('input[name="username"]').type('erina');
    cy.get('input[name="password"]').type('erina');
    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/home');

    // 7 - Abrir Meus Pacientes
    cy.contains(/Meus pacientes/i).click();
    cy.url().should('include', '/meus-pacientes');
    cy.contains(/anne/i).should('exist');
  });
});