import { useEffect, useReducer } from "react";
import axios from "axios";

const useApplicationData = () => {
	// const [state, setState] = useState({
	// 	day: "Monday",
	// 	days: [],
	// 	appointments: {},
	// 	interviewers: {},
	// 	// value: true,  to use in useEffect 2nd arg for trigger fetching of data
	// });
	const SET_DAY = "SET_DAY";
	const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
	const SET_INTERVIEW = "SET_INTERVIEW";

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
				// update remaining spots by counting number of interview with null value
				const days = state.days.map((day) => {
					if (day.name === state.day) {
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

	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => dispatch({ type: SET_DAY, day });

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		])
			.then((all) => {
				const [days, appointments, interviewers] = all;
				dispatch({
					type: SET_APPLICATION_DATA,
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				});
			})
			.catch((error) => console.error(error));
	}, []);

	const bookInterview = (id, interview) => {
		const url = `/api/appointments/${id}`;
		// need to return a promise for transition to listen to
		const promise = axios
			.put(url, { interview })
			.then((res) => dispatch({ type: SET_INTERVIEW, interview, id }));

		return promise;
	};

	const cancelInterview = (id) => {
		const url = `/api/appointments/${id}`;
		return (
			axios
				.delete(url)
				//.then((resolve) => axios.get("/api/appointments"))
				.then((res) => dispatch({ type: SET_INTERVIEW, interview: null, id }))
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
