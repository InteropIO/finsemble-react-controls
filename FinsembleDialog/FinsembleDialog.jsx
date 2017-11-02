/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

import React from 'react';
const DIALOG_BASE_CLASS = 'dialog';
export default class FinsembleDialog extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;

		this.finWindow = fin.desktop.Window.getCurrent();
		this.finWindow.updateOptions({
			alwaysOnTop: true
		});

		this.bindCorrectContext();
		this.setDefaults();

		//Using state here because we have a default value that's set in `setDefaults`.
		FSBL.Clients.DialogManager.userInputTimeout = this.state.userInputTimeout;
		FSBL.Clients.DialogManager.isModal = this.props.isModal;


		this.addResponder();

		document.body.addEventListener('keydown', this.handleKeyDown);
		document.body.className += ' dialog';
	}
	/**
	 * Sets default values and throws errors/warns the user that certain info wasn't provided.
	 *
	 * @memberof FinsembleDialog
	 */
	setDefaults() {
		let { behaviorOnResponse, userInputTimeout } = this.props;
		if (typeof this.props.onShowRequested === 'undefined') {
			throw new Error('No onShowRequested passed to FinsembleDialog. Pass onShowRequested as a property to the FinsembleDialog component.');
		}

		if (typeof behaviorOnResponse === 'undefined') {
			console.warn('No behaviorOnResponse passed to FinsembleDialog. After the dialog sends data back to its opener, this behavior is invoked. The default behavior is to hide. Valid options are "hide" and "close".');
			behaviorOnResponse = 'hide';
		}

		if (typeof userInputTimeout === 'undefined') {
			console.warn('No userInputTimeout passed to FinsembleDialog. This value sets a timeout that warns the dialog\'s opener after a period of inactivity. Default is 10000ms. This prop must be a number in MS.\n');
			userInputTimeout = 10000;
		}

		this.state = {
			behaviorOnResponse: behaviorOnResponse,
			userInputTimeout: userInputTimeout
		};
	}
	bindCorrectContext() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.hideDialog = this.hideDialog.bind(this);
	}

	handleKeyDown(e) {
		if (FSBL.Clients.DialogManager.openerMessage === null && e.code === 'Escape') {
			this.hideDialog();
			FSBL.Clients.DialogManager.hideModal();
		}
	}

	hideDialog() {
		//hide.
		this.finWindow.hide();
	}

	closeDialog() {
		//close.
		this.finWindow.close(true);
	}

	componentDidMount() {
		//DialogManager uses this when it sends its response back to the originating window. After that response is sent, we either hide or close the dialog.
		FSBL.Clients.DialogManager.behaviorOnResponse = this.state.behaviorOnResponse;
		if (this.props.isModal) {
			this.finWindow.addEventListener('shown', FSBL.Clients.DialogManager.showModal);
		}
	}

	componentWillUnmount() {
		if (this.props.isModal) {
			this.finWindow.removeEventListener('shown', FSBL.Clients.DialogManager.showModal);
		}
	}

	addResponder() {
		let self = this;
		FSBL.Clients.DialogManager.registerDialogCallback(this.props.onShowRequested);
	}

	render() {
		let classes = this.props.className;
		classes += ` ${DIALOG_BASE_CLASS}`;
		return (<div className={classes}>
			{this.props.children}
		</div>);
	}
}