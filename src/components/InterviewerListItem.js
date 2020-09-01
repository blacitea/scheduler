import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {
	let interviewersItemClass = classNames("interviewers__item", {
		"interviewers__item--selected": props.selected,
	});
	let interviewersItemImageClass = classNames("interviewers__item-image", {
		"interviewers__item--selected-image": props.selected,
	});
	return (
		<li className={interviewersItemClass} onClick={props.setInterviewer}>
			<img
				className={interviewersItemImageClass}
				key={props.id}
				src={props.avatar}
				alt={props.name}
			/>
			Sylvia Palmer
		</li>
	);
};

export default InterviewerListItem;
