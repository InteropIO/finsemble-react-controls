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

export default class FinsembleToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
	}

    render() {
        let classes = this.props.className || '';
		classes += ` ${TOOLBAR_BASE_CLASS}`;

        return (<div className={classes}>
            {this.props.children}
        </div>)
    }
}