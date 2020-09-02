import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

import "./styles.scss";

const Appointment = (props) => {
	const { interview } = props;
	return (
		<article className="appointment">
			<Header time={props.time} />
			{interview ? (
				<Show student={interview.student} interviewer={interview.interviewer} />
			) : (
				<Empty />
			)}
		</article>
	);
};

export default Appointment;
