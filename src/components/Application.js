import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "../helpers/selectors";

export default function Application(props) {
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

	const appointments = getAppointmentsForDay(state, state.day);
	const interviewers = getInterviewersForDay(state, state.day);

	const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		setState({ ...state, appointments });
	};

	const scheulde = appointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				{...appointment}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
			/>
		);
	});

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} day={state.day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{scheulde}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
