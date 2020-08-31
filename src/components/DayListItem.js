import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

const DayListItem = (props) => {
	let dayListItemClass = classNames({
		"day-list__item": true,
		"day-list__item--selected": props.selected,
		"day-list__item--full": props.spots === 0,
	});

	const formatSpots = () =>
		props.spots === 1
			? "1 spot remaining"
			: `${props.spots ? props.spots : `no`} spots remaining`;

	return (
		<li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
			<h2 className="text--regular">{props.name}</h2>
			<h3 className="text--light">{formatSpots()}</h3>
		</li>
	);
};

export default DayListItem;
