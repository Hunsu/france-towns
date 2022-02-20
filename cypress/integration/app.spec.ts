/// <reference types="cypress" />

describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    it('should show no result', () => {
        cy.get('label:contains("Aucune ville correspondant au texte saisi")')
            .should('have.length', 2);
    });
    it('should show only one metropolitan town', () => {
        cy.get('input').type('Villenouvelle')

        cy.get('label:contains("Aucune ville correspondant au texte saisi")')
            .should('have.length', 1);
        cy.get('[data-cy=overSeasCities]')
            .find("[data-cy=town-name]")
            .should('have.length',0)

        cy.get('label:contains("Une ville correspond au texte saisi")')
            .should('have.length', 1);
    });

    it('should show only one oversea town', () => {
        cy.get('input').type('Fonds-Saint-Denis')

        cy.get('label:contains("Aucune ville correspondant au texte saisi")')
            .should('have.length', 1);

        cy.get('label:contains("Une ville correspond au texte saisi")')
            .should('have.length', 1);
        cy.get('[data-cy=overSeasCities]')
            .find("[data-cy=town-name]")
            .should('have.length',1)
    });

    it('should show multiple results', () => {
        cy.get('input').type('Toulouse')

        cy.get('label:contains("Aucune ville correspondant au texte saisi")')
            .should('have.length', 1);
        cy.get('[data-cy=overSeasCities]')
            .find("[data-cy=town-name]")
            .should('have.length',0)

        cy.get('label:contains("9 villes correspondant au texte saisi")')
            .should('have.length', 1);
        cy.get('[data-cy=metropolitanCities]')
            .find("[data-cy=town-name]")
            .should('have.length',9)
    });

    it('should show result from metropolitan and overseas towns', () => {
        cy.get('input').type('Saint-Denis')

        cy.get('label:contains("4 villes correspondant au texte saisi")')
            .should('have.length', 1);

        cy.get('label:contains("59 villes correspondant au texte saisi")')
            .should('have.length', 1);

        cy.get('[data-cy=metropolitanCities]')
            .find("[data-cy=town-name]")
            .should('have.length',59)

        cy.get('[data-cy=overSeasCities]')
            .find("[data-cy=town-name]")
            .should('have.length',4)
    });
});