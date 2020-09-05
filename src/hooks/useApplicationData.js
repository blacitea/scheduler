import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
		// value: true,  to use in useEffect 2nd arg for trigger fetching of data
	});

	const setDay = (day) => setState((prev) => ({ ...prev, day }));
	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		])
			.then((all) => {
				const [days, appointments, interviewers] = all;
				setState((prev) => {
					console.log("Update by effect hook happened");
					return {
						...prev,
						days: days.data,
						appointments: appointments.data,
						interviewers: interviewers.data,
					};
				});
			})
			.catch((error) => console.error(error));
	}, []); // tried [state.value]

	const bookSlot = (id) => {
		const dayIndex = state.days.findIndex((day) =>
			day.appointments.includes(id)
		);
		const newDay = {
			...state.days[dayIndex],
			spots: state.days[dayIndex].spots - 1,
		};
		const newDays = [...state.days];
		newDays[dayIndex] = newDay;

		return Object.assign(state.days.slice(), { [dayIndex]: newDay });
	};

	const cancelSlot = (id) => {
		const dayIndex = state.days.findIndex((day) =>
			day.appointments.includes(id)
		);
		const newDay = {
			...state.days[dayIndex],
			spots: state.days[dayIndex].spots + 1,
		};
		return [
			...state.days.slice(0, dayIndex),
			newDay,
			...state.days.slice(dayIndex + 1),
		];
	};

	const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const days = bookSlot(id);

		const url = `/api/appointments/${id}`;
		// need to return a promise for transition to listen to
		const promise = axios.put(url, appointment).then((res) => {
			setState((prev) => ({
				...prev,
				days,
				appointments,
				//value: !prev.value,  toggle value to trigger an useEffect run
			}));
			// return setState({
			// 	...state,
			// 	appointments,
			// });
		});
		// .then((res) => {
		// 	console.log(state.value);
		// 	state.value = !state.value;
		// 	console.log(state.value);
		// });
		return promise;
	};

	const cancelInterview = (id) => {
		const url = `/api/appointments/${id}`;
		const days = cancelSlot(id);
		return axios
			.delete(url)
			.then((resolve) => axios.get("/api/appointments"))
			.then((res) =>
				setState((prev) => ({
					...prev,
					days,
					// value: !prev.value,   toggle value to trigger an useEffect run
					appointments: res.data,
				}))
			);
	};

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
};

export default useApplicationData;
