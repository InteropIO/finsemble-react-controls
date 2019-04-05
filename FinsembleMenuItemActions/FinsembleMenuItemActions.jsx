/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
@deprecated, 10/15/18 (now just a simply div so just use a <div className="menu-item-actions">)

*/

import React from 'react';
export default class FinsembleMenuItemActions extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<div className="menu-item-actions" {...this.props}>
			{this.props.children}
		</div>);
	}
}