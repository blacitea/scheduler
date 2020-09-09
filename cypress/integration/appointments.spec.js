beforeEach(() => {
	cy.log('I run before every test in every spec file!');
	cy.visit('/api/debug/reset');
});

describe('Appointment', () => {
	it('should book an interview', () => {
		cy.visit('/').contains('Monday');
		cy.get('[alt=Add]').first().click();
		cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
	});
});
