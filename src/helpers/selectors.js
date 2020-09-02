const getAppointmentsForDay = (state, day) => {
	const result = [];
	const { days, appointments } = state;
	const selectedDay = days.filter((current) => current.name === day)[0];

	// data validation - return empty array if no data given, or day not found
	if (!selectedDay) return [];

	const appointmentsid = [...selectedDay.appointments];
	appointmentsid.forEach((id) => {
		result.push(appointments[id]);
	});
	return result;
};

module.exports.getAppointmentsForDay = getAppointmentsForDay;
