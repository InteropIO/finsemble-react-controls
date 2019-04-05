/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.

@deprecated, 10/15/18 (now just a simply div so just use a <div className="menu-item-action">)
*/
import React from 'react';

const BUTTON_BASE_CLASS = 'menu-item-action';

export default class FinsembleMenuItemAction extends React.Component {
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
		return (<div {...this.props} className={classes}>
			{this.props.children}
		</div>);
	}
}
