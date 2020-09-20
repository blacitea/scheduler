import { useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer, {
	SET_DAY,
	SET_APPLICATION_DATA,
	SET_INTERVIEW,
} from '../reducers/application';

const useApplicationData = () => {
	const [state, dispatch] = useReducer(reducer, {
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = day => dispatch({ type: SET_DAY, day });

	useEffect(() => {
		const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

		// webSocket.addEventListener('open', event => webSocket.send('ping'));
		webSocket.addEventListener('message', event => {
			const newInterview = JSON.parse(event.data);
			if (newInterview.type === 'SET_INTERVIEW') {
				dispatch({
					type: newInterview.type,
					interview: newInterview.interview,
					id: newInterview.id,
				});
			}
		});

		Promise.all([
			axios.get('/api/days'),
			axios.get('/api/appointments'),
			axios.get('/api/interviewers'),
		])
			.then(all => {
				const [days, appointments, interviewers] = all;
				dispatch({
					type: SET_APPLICATION_DATA,
					days: days.data,
					appointments: appointments.data,
					interviewers: interviewers.data,
				});
			})
			.catch(error => console.error(error));
		return () => webSocket.close();
	}, []);

	const bookInterview = (id, interview) => {
		const url = `/api/appointments/${id}`;
		// need to return a promise for transition to listen to
		const promise = axios
			.put(url, { interview })
			.then(res => dispatch({ type: SET_INTERVIEW, interview, id }));

		return promise;
	};

	const cancelInterview = id => {
		const url = `/api/appointments/${id}`;
		return (
			axios
				.delete(url)
				//.then((resolve) => axios.get("/api/appointments"))
				.then(res => dispatch({ type: SET_INTERVIEW, interview: null, id }))
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
