const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

export { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW };

const reducer = (state, action) => {
	switch (action.type) {
		case SET_DAY:
			return { ...state, day: action.day };
		case SET_APPLICATION_DATA:
			return {
				...state,
				days: action.days,
				appointments: action.appointments,
				interviewers: action.interviewers,
			};
		case SET_INTERVIEW: {
			const { id, interview } = action;
			const appointments = {
				...state.appointments,
				[id]: {
					...state.appointments[id],
					interview,
				},
			};

			// verify which day the update of interview happens
			const targetDay = state.days.filter(day =>
				day.appointments.includes(id)
			)[0];

			// update remaining spots by counting number of interview with null value
			const days = state.days.map(day => {
				if (day.name === targetDay.name) {
					const spots = day.appointments.reduce(
						(count, id) =>
							appointments[id].interview == null ? (count += 1) : count,
						0
					);
					return {
						...day,
						spots,
					};
				}
				return day;
			});
			// updating the appointments object based on key(id) with updated interview obj
			return {
				...state,
				appointments,
				days,
			};
		}
		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
};

export default reducer;
