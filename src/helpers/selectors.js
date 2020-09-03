const getAppointmentsForDay = (state, day) => {
	const { days, appointments } = state;
	const selectedDay = days.filter((current) => current.name === day)[0];

	// data validation - return empty array if no data given, or day not found
	return selectedDay
		? selectedDay.appointments.map((id) => appointments[id])
		: [];
};

module.exports.getAppointmentsForDay = getAppointmentsForDay;

const getInterview = (state, interview) =>
	interview
		? { ...interview, interviewer: state.interviewers[interview.interviewer] }
		: null;

module.exports.getInterview = getInterview;
