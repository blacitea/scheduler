import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

import "./styles.scss";
import Form from "./Form";

// List of mode constrain
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

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

	const onDelete = () => {
		transition(DELETING);
		props
			.cancelInterview(id)
			.then((resolve) => transition(EMPTY))
			.catch((error) => console.log(error));
	};

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => transition(CONFIRM)}
				/>
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
			{mode === DELETING && <Status message="Deleting" />}
			{mode === CONFIRM && (
				<Confirm
					onConfirm={onDelete}
					onCancel={back}
					message="Are you sure you would like to delete?"
				/>
			)}
		</article>
	);
};

export default Appointment;
