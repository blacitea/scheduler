import React from "react";
import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

const InterviewerList = (props) => {
	const interviewerList = props.interviewers.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={props.value === interviewer.id}
				onChange={(event) => props.onChange(interviewer.id)}
			/>
		);
	});
	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewerList}</ul>
		</section>
	);
};

export default InterviewerList;
