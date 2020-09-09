import React from 'react';

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText,
	waitForElementToBeRemoved,
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

	xit('aysnc-await: defaults to Monday and changes the schedule when a new day is selected', async () => {
		// async tag the funcion
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText('Monday')); // await tag to pause until completion

		// further code will only run after prev await completed
		fireEvent.click(getByText('Tuesday'));
		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});

	it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
		const { container, debug } = render(<Application />);
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		const input = getByPlaceholderText(appointment, /enter student name/i);

		fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

		expect(getByAltText(appointment, 'Edit')).toBeInTheDocument();
		expect(getByAltText(appointment, 'Delete')).toBeInTheDocument();

		const day = getAllByTestId(container, 'day').find(day =>
			queryByText(day, 'Monday')
		);
		expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
	});

	it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
		// 1. Render the Application.
		const { container } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the delete button on the booked appointment
		// 4. Check that CONFIRM mode is rendered
		// 5. Click the confirm button to cancel the appointment
		// 6. Missed - Check that the element with the text 'Deleting' is displayed. ( mode: STATUS)
		// 7. Check that the appointment slot is now empty - wait until the element with the "Add" button is displayed.
		// 8. Check that the DayListItem with the text 'Monday' also has the text "2 spots remaining"
	});
});
