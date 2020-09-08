import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

const DayListItem = props => {
	const { name, selected, spots } = props;
	let dayListItemClass = classNames({
		'day-list__item': true,
		'day-list__item--selected': selected,
		'day-list__item--full': spots === 0,
	});

	const formatSpots = () =>
		`${spots ? spots : `no`} ${spots === 1 ? 'spot' : 'spots'} remaining`;

	return (
		<li
			className={dayListItemClass}
			onClick={() => props.setDay(name)}
			data-testid="day"
		>
			<h2 className="text--regular">{name}</h2>
			<h3 className="text--light">{formatSpots()}</h3>
		</li>
	);
};

export default DayListItem;
