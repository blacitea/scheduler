import React from 'react';

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
	it('defaults to Monday and changes the schedule when a new day is selected', () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText('Monday')).then(() => {
			fireEvent.click(getByText('Tuesday'));
			expect(getByText('Leopold Silvers')).toBeInTheDocument();
		});
	});

	it('aysnc-await: defaults to Monday and changes the schedule when a new day is selected', // async tag the funcion
	async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText('Monday')); // await tag to pause until completion

		// further code will only run after prev await completed
		fireEvent.click(getByText('Tuesday'));
		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});
});

xit('renders without crashing', () => {
	render(<Application />);
});
