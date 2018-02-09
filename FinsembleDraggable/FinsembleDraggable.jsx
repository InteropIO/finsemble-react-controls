import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
export default class FinsembleDraggable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let draggableId = this.props.draggableId || `Id-Unset-${Math.random() * 23214}`;
		let isDragDisabled = typeof (this.props.isDragDisabled) === 'undefined' ? false : this.props.isDragDisabled;
		let noop = () => { };
		return (<Draggable isDragDisabled={isDragDisabled} key={this.props.index} draggableId={draggableId} index={this.props.index}>
			{(provided, snapshot) => (
				<div onClick={this.props.onClick || noop} className={this.props.wrapperClass || ''}>
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