/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';
const BUTTON_BASE_CLASS = 'finsemble-button-label';
export default class FinsembleButtonLabel extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Renders a buttonLabel with the appropriate classes.
		let classes = this.props.className || '';
		let align = this.props.align || 'left';
		let alignClassMap = {
			'left': 'finsemble-button-label-left',
			'right': 'finsemble-button-label-right'
		};
		let labelClass = alignClassMap[align];

		classes += ` ${BUTTON_BASE_CLASS} ${labelClass}`;
		return (<div draggable={this.props.draggable} onDragStart={this.props.onDragStart} onDragEnd={this.props.onDragEnd} className={classes}>{this.props.label}</div>);
	}
}
