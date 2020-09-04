import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
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
	}, []);

	const createNewDay = (id, decreaseSlot = true) => {
		const dayId = state.days.findIndex((day) => day.appointments.includes(id));
		const newDay = {
			...state.days[dayId],
			spots: decreaseSlot
				? state.days[dayId].spots - 1
				: state.days[dayId].spots + 1,
		};
		return [
			...state.days.slice(0, dayId),
			newDay,
			...state.days.slice(dayId + 1),
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

		// const createNewDay = (id, decreaseSlot = true) => {
		// 	const dayId = state.days.findIndex((day) =>
		// 		day.appointments.includes(id)
		// 	);
		// 	const newDay = {
		// 		...state.days[dayId],
		// 		spots: state.days[dayId].spots - 1,
		// 	};
		// 	return [
		// 		...state.days.slice(0, dayId),
		// 		newDay,
		// 		...state.days.slice(dayId + 1),
		// 	];
		// };

		const days = createNewDay(id);

		const url = `/api/appointments/${id}`;
		// need to return a promise for transition to listen to
		const promise = axios.put(url, appointment).then((res) => {
			setState((prev) => ({
				...prev,
				days,
				appointments,
			}));
		});
		return promise;
	};

	const cancelInterview = (id) => {
		const url = `/api/appointments/${id}`;
		const days = createNewDay(id, false);
		return axios
			.delete(url)
			.then((resolve) => axios.get("/api/appointments"))
			.then((res) => setState({ ...state, days, appointments: res.data }));
	};

	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
};

export default useApplicationData;
