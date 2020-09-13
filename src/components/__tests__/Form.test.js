import React from 'react';

import {
	render,
	cleanup,
	fireEvent,
	getByAltText,
} from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

// Use describe to group tests
describe('Form', () => {
	const interviewers = [
		{
			id: 1,
			name: 'Sylvia Palmer',
			avatar: 'https://i.imgur.com/LpaY82x.png',
		},
	];
	it('renders without crashing', () => {
		render(<Form interviewers={interviewers} />);
	});
	it('renders without student name if not provided', () => {
		const { getByPlaceholderText } = render(
			<Form interviewers={interviewers} />
		);
		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
	});

	it('renders with initial student name', () => {
		const { getByTestId } = render(
			<Form interviewers={interviewers} name="Lydia Miller-Jones" />
		);

		expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
	});

	it('validates that the student name is not blank', () => {
		//Set up
		const onSave = jest.fn();
		const { getByText } = render(
			<Form interviewers={interviewers} onSave={onSave} />
		);
		fireEvent.click(getByText('Save'));
		/* 1. validation is shown */
		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
		/* 2. onSave is not called */
		expect(onSave).not.toHaveBeenCalled();
	});

	it('validates that the interviewer is not blank', () => {
		//Set up
		const onSave = jest.fn();
		const { getByText, getByPlaceholderText } = render(
			<Form interviewers={interviewers} onSave={onSave} />
		);
		const input = getByPlaceholderText('Enter Student Name');
		fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
		fireEvent.click(getByText('Save'));
		/* 1. validation is shown */
		expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
		/* 2. onSave is not called */
		expect(onSave).not.toHaveBeenCalled();
	});

	it('calls onSave function when the name is defined', () => {
		const onSave = jest.fn();
		// getByText for something you know should be in DOM
		// queryByText for something you know should be in DOM, compare with null
		const { queryByText, getByText } = render(
			<Form
				interviewers={interviewers}
				name="Lydia Miller-Jones"
				onSave={onSave}
				value={1}
			/>
		);

		fireEvent.click(getByText('Save'));

		/* 3. validation is not shown */
		expect(queryByText(/student name cannot be blank/i)).toBeNull();
		expect(queryByText(/please select an interviewer/i)).toBeNull();

		/* 4. onSave is called once*/
		expect(onSave).toHaveBeenCalledTimes(1);

		/* 5. onSave is called with the correct arguments */
		expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
	});

	it('submits the name entered by the user', () => {
		const onSave = jest.fn();
		const { getByText, getByPlaceholderText, debug, getByAltText } = render(
			<Form interviewers={interviewers} onSave={onSave} />
		);

		const input = getByPlaceholderText('Enter Student Name');

		fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
		debug();
		fireEvent.click(getByAltText(/palmer/i));
		fireEvent.click(getByText('Save'));

		expect(onSave).toHaveBeenCalledTimes(1);
		expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
	});

	it('can successfully save after trying to submit an empty student name', () => {
		const onSave = jest.fn();
		const {
			getByText,
			getByPlaceholderText,
			queryByText,
			getByAltText,
		} = render(<Form interviewers={interviewers} onSave={onSave} />);

		fireEvent.click(getByText('Save'));

		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();

		fireEvent.change(getByPlaceholderText('Enter Student Name'), {
			target: { value: 'Lydia Miller-Jones' },
		});
		fireEvent.click(getByAltText(/palmer/i));
		fireEvent.click(getByText('Save'));

		expect(queryByText(/student name cannot be blank/i)).toBeNull();

		expect(onSave).toHaveBeenCalledTimes(1);
		expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
	});

	it('calls onCancel and resets the input field', () => {
		const onCancel = jest.fn();
		const { getByText, queryByText, getByPlaceholderText } = render(
			<Form
				interviewers={interviewers}
				name="Lydia Miller-Jones"
				onSave={jest.fn()}
				onCancel={onCancel}
			/>
		);

		fireEvent.click(getByText('Save'));

		fireEvent.change(getByPlaceholderText('Enter Student Name'), {
			target: { value: 'Lydia Miller-Jones' },
		});

		fireEvent.click(getByText('Cancel'));

		expect(onCancel).toHaveBeenCalledTimes(1);

		expect(queryByText(/student name cannot be blank/i)).toBeNull();

		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

		expect(getByPlaceholderText('Enter Student Name')).not.toHaveValue(
			'Lydia Miller-Jones'
		);
	});
});
