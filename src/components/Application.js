import React, { useState } from "react";
import DayList from "components/DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

const days = [
	{
		id: 1,
		name: "Monday",
		spots: 2,
	},
	{
		id: 2,
		name: "Tuesday",
		spots: 5,
	},
	{
		id: 3,
		name: "Wednesday",
		spots: 0,
	},
];

const appointments = [
	{
		id: 2,
		time: "1pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 3,
				name: "Mildred Nazir",
				avatar: "https://i.imgur.com/T2WwVfS.png",
			},
		},
	},
	{
		id: 1,
		time: "12pm",
	},
	{
		id: 3,
		time: "2pm",
		interview: {
			student: "Mimi Medlay",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 4,
		time: "3pm",
		interview: {
			student: "Jay Lee",
			interviewer: {
				id: 3,
				name: "Mildred Nazir",
				avatar: "https://i.imgur.com/T2WwVfS.png",
			},
		},
	},
	{
		id: 5,
		time: "4pm",
	},
	{
		id: 6,
		time: "5pm",
	},
	{
		id: "last",
		time: "6pm",
		interview: {
			student: "Blacite",
			interviewer: {
				id: 4,
				name: "Cohana Roy",
				avatar: "https://i.imgur.com/FK8V841.jpg",
			},
		},
	},
];

export default function Application(props) {
	const [day, setDay] = useState("Monday");
	const appointmentList = appointments.map((appointment) => {
		return <Appointment key={appointment.id} {...appointment} />;
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
					<DayList days={days} day={day} setDay={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">{appointmentList}</section>
		</main>
	);
}
