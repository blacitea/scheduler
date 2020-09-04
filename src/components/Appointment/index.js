import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Form from "./Form";

// List of mode constrain
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

const Appointment = (props) => {
	//console.log(props);
	const { interview, interviewers, id } = props;
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	const onSave = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props.bookInterview(id, interview).then((resolve) => {
			if (resolve) transition(SHOW);
		});
	};

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === SHOW && (
				<Show student={interview.student} interviewer={interview.interviewer} />
			)}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === CREATE && (
				<Form
					onCancel={() => back()}
					onSave={onSave}
					interviewers={interviewers}
				/>
			)}
			{mode === SAVING && <Status message="Saving" />}
		</article>
	);
};

export default Appointment;
