import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "",
		days: [],
		appointments: {},
		interviewers: {},
	});
	const setDay = (day) => setState((prev) => ({ ...prev, day }));
	useEffect(() => {
		Promise.all([
			axios.get("http://localhost:8001/api/days"),
			axios.get("http://localhost:8001/api/appointments"),
			axios.get("http://localhost:8001/api/interviewers"),
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
	const appointmentList = getAppointmentsForDay(state, state.day).map(
		(appointment) => {
			return <Appointment key={appointment.id} {...appointment} />;
		}
	);
	console.log(appointmentList);
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
				{appointmentList}
				{appointmentList.length > 1 && <Appointment key="last" time="5pm" />}
			</section>
		</main>
	);
}
