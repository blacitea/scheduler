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
import axios from 'axios';

afterEach(cleanup);

describe('Application', () => {
	it('defaults to Monday and changes the schedule when a new day is selected', () => {
		const { getByText } = render(<Application />);

		return waitForElement(() => getByText('Monday')).then(() => {
			fireEvent.click(getByText('Tuesday'));
			expect(getByText('Leopold Silvers')).toBeInTheDocument();
		});
	});

	it('aysnc-await: defaults to Monday and changes the schedule when a new day is selected', async () => {
		// async tag the funcion
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText('Monday')); // await tag to pause until completion

		// further code will only run after prev await completed
		fireEvent.click(getByText('Tuesday'));
		expect(getByText('Leopold Silvers')).toBeInTheDocument();
	});

	it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
		// 1. Render the Application.
		const { container } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the "Add" button on the first empty appointment.
		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		// 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
		const input = getByPlaceholderText(appointment, /enter student name/i);
		fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

		// 5. Click the first interviewer in the list.
		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		// 6. Click the "Save" button on that same appointment.
		fireEvent.click(getByText(appointment, 'Save'));

		// 7. Check that the element with the text "Saving" is displayed.
		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		// 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
		await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

		expect(getByAltText(appointment, 'Edit')).toBeInTheDocument();
		expect(getByAltText(appointment, 'Delete')).toBeInTheDocument();

		// 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
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
		const appointment = getAllByTestId(
			container,
			'appointment'
		).find(appointment => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(getByAltText(appointment, 'Delete'));

		// 4. Check that CONFIRM mode is rendered
		expect(
			getByText(appointment, /are you sure you would like to delete/i)
		).toBeInTheDocument();

		// 5. Click the confirm button to cancel the appointment
		fireEvent.click(getByText(appointment, 'Confirm'));

		// 6. Missed - Check that the element with the text 'Deleting' is displayed. ( mode: STATUS)
		expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

		// 7. Check that the appointment slot is now empty - wait until the element with the "Add" button is displayed.
		await waitForElement(() => getByAltText(appointment, 'Add'));

		// 8. Check that the DayListItem with the text 'Monday' also has the text "2 spots remaining"
		const day = getAllByTestId(container, 'day').find(day =>
			queryByText(day, 'Monday')
		);
		expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
	});

	it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
		// 1. Render the component
		const { container, debug } = render(<Application />);

		// 2. Wait until the text 'Archie Cohen' is displayed
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the Edit button
		const appointment = getAllByTestId(
			container,
			'appointment'
		).find(appointment => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(getByAltText(appointment, 'Edit'));

		// 4. Wait for create page display with value 'Archie Cohen', check if button for save/cancel is displayed
		expect(getByText(appointment, 'Cancel')).toBeInTheDocument();
		expect(getByText(appointment, 'Save')).toBeInTheDocument();

		// 5. Change the value of student name to 'yyy'
		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: 'Mike Linday' },
		});
		// 6. Click the Save button
		fireEvent.click(getByText(appointment, 'Save'));

		// 7. Check that the element with the text 'Saving' is displayed.
		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		// 8. Wait until the text 'yyy' is displayed
		await waitForElement(() => getByText(appointment, 'Mike Linday'));

		// 9. Check that the DayListItem with the text 'Monday' also has the text "1 spot remaining"
		const day = getAllByTestId(container, 'day').find(day =>
			queryByText(day, 'Monday')
		);
		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
	});

	it('shows the save error when failing to save an appointment', async () => {
		//mock rejected promise once, on 2nd put call will revert to default behaviour
		axios.put.mockRejectedValueOnce();

		const { container, debug } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the "Add" button on the first empty appointment.
		const appointments = getAllByTestId(container, 'appointment');
		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		// 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
		const input = getByPlaceholderText(appointment, /enter student name/i);
		fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });

		// 5. Click the first interviewer in the list.
		fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

		// 6. Click the "Save" button on that same appointment.
		fireEvent.click(getByText(appointment, 'Save'));

		// 7. Check that the element with the text "Saving" is displayed.
		expect(getByText(appointment, 'Saving')).toBeInTheDocument();

		// 8. Wait until the element with the text "Count not save appointment" is displayed.
		await waitForElement(() =>
			getByText(appointment, /could not save appointment/i)
		);
	});

	it('shows the save error when failing to delete an appointment', async () => {
		//mock rejected promise once, on 2nd put call will revert to default behaviour
		axios.delete.mockRejectedValueOnce();

		// 1. Render the Application.
		const { container, debug } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		// 3. Click the delete button on the booked appointment
		const appointment = getAllByTestId(
			container,
			'appointment'
		).find(appointment => queryByText(appointment, 'Archie Cohen'));

		fireEvent.click(getByAltText(appointment, 'Delete'));

		// 4. Check that CONFIRM mode is rendered
		expect(
			getByText(appointment, /are you sure you would like to delete/i)
		).toBeInTheDocument();

		// 5. Click the confirm button to cancel the appointment
		fireEvent.click(getByText(appointment, 'Confirm'));

		// 6. Missed - Check that the element with the text 'Deleting' is displayed. ( mode: STATUS)
		expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

		// 7. Wait until the element with the text "Count not delete appointment" is displayed.
		await waitForElement(() =>
			getByText(appointment, /could not cancel appointment/i)
		);

		// 8. Click the close button
		fireEvent.click(getByAltText(appointment, 'Close'));

		// 9. Expect the text "Count not delete appointment" is not displayed.
		await waitForElement(() => getByText(appointment, 'Archie Cohen'));

		expect(
			queryByText(appointment, /could not cancel appointment/i)
		).toBeNull();

		// 8. Check that the DayListItem with the text 'Monday' still has the text "1 spot remaining"
		const day = getAllByTestId(container, 'day').find(day =>
			queryByText(day, 'Monday')
		);
		expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
	});
});
