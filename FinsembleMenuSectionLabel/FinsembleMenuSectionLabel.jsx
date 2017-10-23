/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';

export default class FinsembleMenuSectionLabel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="menu-section-label">
            {this.props.children}
        </div>)
    }
}
