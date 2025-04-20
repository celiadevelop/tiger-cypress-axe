import 'cypress-axe';

describe('Accessibility Test', () => {
  beforeEach(() => {
    // Ignora errores JS de la página
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://www.flyingtiger.com');
    cy.injectAxe();
  });

  it('Guarda errores de accesibilidad en un archivo JSON', () => {
    cy.checkA11y(null, null, (violations) => {
      // Imprime en consola
      violations.forEach(({ id, impact, description, helpUrl, nodes }) => {
        cy.log(`🚨 ${impact.toUpperCase()} - ${id}: ${description}`);
        cy.log(`🔗 Más info: ${helpUrl}`);
        cy.log(`🔧 Elementos afectados: ${nodes.length}`);
      });

      // Guarda en archivo JSON
      cy.writeFile('cypress/reports/a11y-results.json', violations);
    });
  });
});
