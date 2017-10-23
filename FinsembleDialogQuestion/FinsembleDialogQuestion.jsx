/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';
const DIALOG_QUESTION_BASE_CLASS = 'dialog-question';

export default class FinsembleDialogQuestion extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //This just adds the base class to any classNames passed into the dialogQuestion.
        let classes = this.props.className;
        //If you're unfamiliar with this syntax, it's equivalent to
		//classes+=' ' + DIALOG_QUESTION_BASE_CLASS;
        classes += ` ${DIALOG_QUESTION_BASE_CLASS}`
        return (<div {...this.props} className={classes}>
            {this.props.question}
            {this.props.children}
        </div>)
    }
}
