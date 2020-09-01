import React from "react";
import DayListItem from "components/DayListItem";
const DayList = (props) => {
	const dayList = props.days.map((day) => {
		console.log(day);
		console.log(day.id);
		console.log(day.spots);
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
