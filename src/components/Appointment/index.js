import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
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
const EDIT = "EDIT";
const ERRORSAVE = "ERRORSAVE";
const ERRORDELETE = "ERRORDELETE";

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
		props
			.bookInterview(id, interview)
			.then((resolve) => transition(SHOW))
			.catch((error) => transition(ERRORSAVE, true));
	};

	const onDelete = () => {
		transition(DELETING, true);
		props
			.cancelInterview(id)
			.then((resolve) => transition(EMPTY))
			.catch((error) => transition(ERRORDELETE, true));
	};

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === SHOW && (
				<Show
					student={interview.student}
					interviewer={interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === CREATE && (
				<Form onCancel={back} onSave={onSave} interviewers={interviewers} />
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
			{mode === EDIT && (
				<Form
					onCancel={back}
					name={interview.student}
					value={interview.interviewer.id}
					onSave={onSave}
					interviewers={interviewers}
				/>
			)}
			{mode === ERRORSAVE && (
				<Error message="Could not save appointment" onClose={back} />
			)}
			{mode === ERRORDELETE && (
				<Error message="Could not cancel appointment" onClose={back} />
			)}
		</article>
	);
};

export default Appointment;
