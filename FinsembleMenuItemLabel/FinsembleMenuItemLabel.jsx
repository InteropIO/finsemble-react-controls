
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
const React = require('react');
var FinsembleButton = require('../FinsembleButton/FinsembleButton');
class FinsembleMenuItemLabel extends React.Component {
	constructor(props) {
		super(props);
	}
    render() {
        return (<FinsembleButton buttonType="MenuItemLabel" {...this.props}>
			{this.props.children}
		</FinsembleButton>)
	}
}
module.exports = FinsembleMenuItemLabel;