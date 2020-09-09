beforeEach(() => {
	cy.log('I run before every test in every spec file!');
	cy.request('GET', '/api/debug/reset');
});

describe('Appointment', () => {
	it('should book an interview', () => {
		cy.visit('/').contains('Monday');

		// use .first() because 2nd button hidden by css style
		cy.get('[alt=Add]').first().click();

		cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');

		cy.get('[alt="Sylvia Palmer"]').click();

		cy.contains('Save').first().click();

		cy.contains('.appointment__card--show', 'Lydia Miller-Jones');
		cy.contains('.appointment__card--show', 'Sylvia Palmer');

		// cy.contains('Lydia Miller-Jones'); // wait till student name displayed
		// cy.get('.appointment__card--show').eq(1).contains('Sylvia Palmer'); // check for class name and interviewer name display
	});
});
