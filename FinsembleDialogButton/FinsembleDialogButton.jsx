/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = 'fsbl-button';
import React from 'react';
import FinsembleButton from '../FinsembleButton/FinsembleButton';

export default class FinsembleDialogButton extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		//Default size is medium.
		let size = this.props.buttonSize || 'md';
		//If you're unfamiliar with this syntax, it's equivalent to
		//let classes='fsbl-button-' + size;
		let classes=`fsbl-button-${size}`;
		classes += ' ' + this.props.className;
		return (<FinsembleButton className={classes} {...this.props} buttonType="Dialog">
			{this.props.children}
		</FinsembleButton>);
	}
}
