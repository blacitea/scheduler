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

		// cy.contains('Lydia Miller-Jones'); // wait till student name displayed
		// cy.get('.appointment__card--show').eq(1).contains('Sylvia Palmer'); // check for class name and interviewer name display
	});
});
