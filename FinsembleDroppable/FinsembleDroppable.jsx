

import { Droppable } from 'react-beautiful-dnd';
import React from 'react';
export default class FinsembleDroppable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Droppable ignoreContainerClipping={true} direction="horizontal" droppableId="droppable">
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