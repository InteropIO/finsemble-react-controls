
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const React = require('react');
const DIALOG_INPUT_BASE_CLASS = 'dialog-input';

class FinsembleDialogTextInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let classes = this.props.className || '';
        //If you're unfamiliar with this syntax, it's equivalent to
		//classes+=' ' + DIALOG_INPUT_BASE_CLASS;
        classes += ` ${DIALOG_INPUT_BASE_CLASS}`
        return (<div className={classes}>
            <label htmlFor="single-input">{this.props.inputLabel}</label>
            <div className="form-group">
                <input type="text" onChange={this.props.onInputChange} />
            </div>
            {this.props.children}
        </div>)
    }
}
module.exports = FinsembleDialogTextInput;