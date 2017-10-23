
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';
import FinsembleButton from '../FinsembleButton/FinsembleButton';

export default class FinsembleMenuItemLabel extends React.Component {
	constructor(props) {
		super(props);
	}
    render() {
        return (<FinsembleButton buttonType="MenuItemLabel" {...this.props}>
			{this.props.children}
		</FinsembleButton>)
	}
}
