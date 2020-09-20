import reducer from './application';

describe('Application Reducer', () => {
	test('throws an error with an unsupported type', () => {
		expect(() => {
			reducer({}, { type: 'SOMETHING' });
		}).toThrowError(/tried to reduce with unsupported action type/i);
	});
});
