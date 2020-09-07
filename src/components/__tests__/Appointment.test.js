import React from 'react';

import { render, cleanup } from '@testing-library/react';

import Appointment from 'components/Appointment';

afterEach(cleanup);

// Use describe to group tests
describe('Appointment', () => {
	it('renders without crashing', () => {
		render(<Appointment />);
	});
});
