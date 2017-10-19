/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const BUTTON_BASE_CLASS = 'menu-item-action';
const React = require('react');
var FinsembleButton = require('../FinsembleButton/FinsembleButton');
class FinsembleMenuItemActions extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
        let classes = this.props.className || BUTTON_BASE_CLASS;
        if (classes !== BUTTON_BASE_CLASS) {
            //If you're unfamiliar with this syntax, it's equivalent to
		    //classes+=' ' + BUTTON_BASE_CLASS;
            classes +=  ` ${BUTTON_BASE_CLASS}`;
        }
        return (<FinsembleButton {...this.props} className={classes}>
			{this.props.children}
		</FinsembleButton>)
	}
}
module.exports = FinsembleMenuItemActions;