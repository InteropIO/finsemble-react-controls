/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

/**
 * FinsembleToolbar
 * This is a container for toolbar sections
 */



import React from 'react';
const TOOLBAR_BASE_CLASS = 'finsemble-toolbar';
import FinsembleDnDContext from '../FinsembleDnDContext/FinsembleDnDContext';
export default class FinsembleToolbar extends React.Component {
	constructor(props) {
		console.log('RENDERING SOON');

		super(props);
		this.props = props;
		if (this.props.onDragEnd) {
			this.onDragEnd = this.props.onDragEnd;
		} else {
			//...
			this.onDragEnd = () => { };
		}
	}

	render() {
		let classes = this.props.className || '';
		classes += ` ${TOOLBAR_BASE_CLASS}`;

		return (

			<FinsembleDnDContext onDragEnd={this.onDragEnd}>
				<div className={classes}>
					{this.props.children}
				</div>
			</FinsembleDnDContext>

		);
	}
}
