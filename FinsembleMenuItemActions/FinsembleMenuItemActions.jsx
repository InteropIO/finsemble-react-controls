/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = '';
import React from 'react';
import FinsembleButton from '../FinsembleButton/FinsembleButton';
export default class FinsembleMenuItemActions extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
        return (<FinsembleButton buttonType="MenuItemActions" {...this.props}>
			{this.props.children}
		</FinsembleButton>)
	}
}