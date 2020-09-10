describe('Appointment', () => {
	beforeEach(() => {
		cy.request('GET', '/api/debug/reset');
		cy.visit('/').contains('Monday');
	});

	it('should book an interview', () => {
		// use .first() because 2nd button hidden by css style
		cy.get('[alt=Add]').first().click();

		cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
		cy.get('[alt="Sylvia Palmer"]').click();

		cy.contains('Save').click();

		cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
		cy.contains('.appointment__card--show', 'Sylvia Palmer');
	});

	it('should edit an interview', () => {
		// {option} force:true overrides the actionable checks
		cy.get('[alt=Edit]').click({ force: true });

		cy.get('[data-testid=student-name-input]').clear().type('Mike Jaydan');
		cy.get('[alt="Tori Malcolm"]').click();

		cy.contains('Save').click();

		cy.contains('.appointment__card--show', 'Mike Jaydan');
		cy.contains('.appointment__card--show', 'Tori Malcolm');
	});

	it('should cancel an interview', () => {
		cy.get('[alt=Delete]').click({ force: true });

		cy.contains('Confirm').click();

		// Confirm loading page - status(Deleting) displayed and completed
		cy.contains('Deleting');
		cy.contains('Deleting').should('not.exist');

		cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
	});
});
