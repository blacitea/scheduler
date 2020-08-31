import React from "react";
const DayListItem = (props) => {
	return (
		<li onClick={() => props.setDay(props.name)}>
			<h2 className="text--regular">{props.name}</h2>
			<h3 className="text--light">{props.spots}</h3>
		</li>
	);
};

export default DayListItem;
