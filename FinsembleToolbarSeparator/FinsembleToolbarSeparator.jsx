
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

/**
 * Toolbar separator is a vertical separator to be used between toolbar items.
 */
const BUTTON_BASE_CLASS = 'divider';
const React = require('react');
class FinsembleToolbarSeparator extends React.Component {
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
module.exports = FinsembleToolbarSeparator;