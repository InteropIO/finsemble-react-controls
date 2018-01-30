import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
export default class FinsembleDraggable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<Draggable key={this.props.index} draggableId={this.props.draggableId} index={this.props.index}>
			{(provided, snapshot) => (
				<div className={this.props.wrapperClass}>
					<div ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}>
						{this.props.children}
					</div>
					{provided.placeholder}
				</div>

			)}
		</Draggable >);
	}
}