
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

import React from 'react';
const DIALOG_INPUT_BASE_CLASS = 'dialog-input';

export default class FinsembleDialogTextInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let classes = this.props.className || '';
		//If you're unfamiliar with this syntax, it's equivalent to
		//classes+=' ' + DIALOG_INPUT_BASE_CLASS;
		classes += ` ${DIALOG_INPUT_BASE_CLASS}`;
		return (<div className={classes}>
			<label htmlFor="single-input">{this.props.inputLabel}</label>
			<div className="form-group">
				<input autoFocus={this.props.autoFocus}
					type="text" maxLength={typeof this.props.maxLength !== 'undefined' ? this.props.maxLength : null}
					defaultValue={this.props.defaultValue || ''}
					onChange={this.props.onInputChange}
					placeholder={this.props.placeholder ? this.props.placeholder : ''} />
			</div>
			{this.props.children}
		</div>);
	}
}
