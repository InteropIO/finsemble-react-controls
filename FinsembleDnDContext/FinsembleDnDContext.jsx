import { DragDropContext} from 'react-beautiful-dnd';
import React from 'react';
export default class FinsembleDnDContext extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let defaultOnDragEnd = () => {
			console.warn('No onDragEnd passed to FinsembleDnDContext');
		};
		let defaultOnDragStart = ()=>{};
		let onDragEnd = this.props.onDragEnd || defaultOnDragEnd;
		let onDragStart = this.props.onDragStart || defaultOnDragStart;
		return (<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
			{this.props.children}
		</DragDropContext>);
	}
}