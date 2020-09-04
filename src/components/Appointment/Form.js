import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

	const reset = () => {
		setName("");
		setInterviewer(null);
	};

	const cancel = () => {
		reset();
		props.onCancel();
	};

	//	const save = () => props.onSave(name, interviewer);

	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
					<input
						value={name}
						onChange={(event) => setName(event.target.value)}
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						/*
          This must be a controlled component
        */
					/>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button onClick={cancel} danger>
						Cancel
					</Button>
					<Button onClick={() => props.onSave(name, interviewer)} confirm>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

export default Form;
