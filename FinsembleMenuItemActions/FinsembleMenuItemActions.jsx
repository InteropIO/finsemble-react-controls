/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = '';
const React = require('react');
var FinsembleButton = require('../FinsembleButton/FinsembleButton');
class FinsembleMenuItemActions extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
        return (<FinsembleButton buttonType="MenuItemActions" {...this.props}>
			{this.props.children}
		</FinsembleButton>)
	}
}
module.exports = FinsembleMenuItemActions;