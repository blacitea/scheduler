const { testHook } = require('react-hooks-testing-library');
const { CYCLIC_KEY } = require('@storybook/addon-actions');

describe('Navigation', () => {
	it('should visit root', () => {
		cy.visit('/');
	});

	it('should navigation to Tuesday', () => {
		cy.visit('/');

		cy.contains('[data-testid=day]', 'Tuesday') // use data-testid / data-cy over element tag
			.click()
			.should('have.class', 'day-list__item--selected');
		// .should('have.css', 'background-color', 'rgb(242, 242, 242)'); // bad practice - css are very changable
	});
});
