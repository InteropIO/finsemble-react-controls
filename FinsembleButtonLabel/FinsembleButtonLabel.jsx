/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';
const BUTTON_BASE_CLASS = 'finsemble-toolbar-button-label';
export default class FinsembleButtonLabel extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Renders a buttonLabel with the appropriate classes.
		let classes = this.props.className || '';
		let align = this.props.align || 'left';
		let alignClassMap = {
			'left': 'toolbar-button-label-left',
			'right': 'toolbar-button-label-right'
		};
		let labelClass = alignClassMap[align];

		classes += ` ${BUTTON_BASE_CLASS} ${labelClass}`;
		return (<div className={classes}>{this.props.label}</div>)
	}
}
