
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/


import React from 'react';
const BUTTON_BASE_CLASS = 'divider';

/**
 * Toolbar separator is a vertical separator to be used between toolbar items.
 */
export default class FinsembleToolbarSeparator extends React.Component {
	constructor(props) {
		super(props);
	}
    render() {
        let classes = this.props.className || '';
		classes += ` ${BUTTON_BASE_CLASS}`;
        return (<div {...this.props} className={classes}>
			{this.props.children}
		</div>)
	}
}
