import React from "react";
import DayListItem from "components/DayListItem";
const DayList = (props) => {
	const dayList = props.days.map((day) => {
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				selected={day.name === props.day}
				spots={day.spots}
				setDay={props.setDay}
			/>
		);
	});
	return <ul>{dayList}</ul>;
};

export default DayList;
