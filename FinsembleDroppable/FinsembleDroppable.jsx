

import { Droppable } from 'react-beautiful-dnd';
import React from 'react';
export default class FinsembleDroppable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let direction = this.props.direction || 'horizontal';
		let droppableId = this.props.droppableId || 'droppable';
		return (
			<Droppable direction={direction} droppableId={droppableId}>
				{(provided, snapshot) => (
					<div className={this.props.classes}
						ref={provided.innerRef}
					>
						{this.props.children}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		);
	}
}