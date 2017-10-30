/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';
const MENU_BASE_CLASS = 'menu';
/**
 * Little helper just to set some defaults if the user passes in undefined values.
 *
 * @param {any} pad
 * @returns
 */
function Padding(pad) {
	let padding = {
		height: 0,
		width: 0
	};

	if (pad && pad.height) {
		padding.height = pad.height;
	}
	if (pad && pad.width) {
		padding.width = pad.width;
	}

	return padding;
}

export default class FinsembleMenu extends React.Component {
	//Sets up the menu, adding listeners and necessary CSS Classes.
	constructor(props) {
		super(props);
		this.finWindow = fin.desktop.Window.getCurrent();
		this.state = {
			bounds: {
				height: 2000
			}
		};
		this.props = props;
		this.bindCorrectContext();
		this.padding = new Padding(this.props.padding);
		this.finWindow.updateOptions({
			alwaysOnTop: true
		});
		this.addListeners();
		document.body.className += ' Menu';
	}

	/**
     * Required to make `this` correct inside of these functions.
     *
     * @memberof FinsembleMenu
     */
	bindCorrectContext() {
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
		this.onWindowBlurred = this.onWindowBlurred.bind(this);
		this.onWindowShown = this.onWindowShown.bind(this);
		this.onCloseRequested = this.onCloseRequested.bind(this);
		this.onBeforeUnload = this.onBeforeUnload.bind(this);
		this.onBoundsChanged = this.onBoundsChanged.bind(this);
		this.addListeners = this.addListeners.bind(this);
		this.cacheBounds = this.cacheBounds.bind(this);
	}
	/**
     * Adds listeners that will handle page reloads, and the user pressing the escape key.
     *
     * @memberof FinsembleMenu
     */
	addListeners() {
		this.addFinWindowListeners();
		window.addEventListener('beforeunload', this.onBeforeUnload);
		document.body.addEventListener('keydown', this.handleKeyDown);
	}
	/**
     * Listen for openfin events.
     *
     * @memberof FinsembleMenu
     */
	addFinWindowListeners() {
		this.finWindow.addEventListener('blurred', this.onWindowBlurred);
		this.finWindow.addEventListener('shown', this.onWindowShown);
		this.finWindow.addEventListener('close-requested', this.onCloseRequested);
		this.finWindow.addEventListener('bounds-changed', this.onBoundsChanged);
	}
	/**
     * If the user presses escape while the window is visible, hide it.
     *
     * @param {any} e
     * @memberof FinsembleMenu
     */
	handleKeyDown(e) {
		if (e.code === 'Escape') {
			this.hideMenu();
		}
	}

	//hide.
	hideMenu() {
		this.finWindow.hide();
	}
	/**
     * Cache bounds so that on reload, we don't add padding again. This is just for development. We don't want our menus to keep getting fatter as `FSBL.Clients.WindowClient.fitToDOM` is called.
     *
     * @param {any} bounds
     * @memberof FinsembleMenu
     */
	onBoundsChanged(bounds) {
		this.setState({
			bounds: bounds
		});
	}

	/**
     * Before the page reloads, set its size to what it was when the page loaded. This is so that when the reload completes, and `FSBL.Clients.WindowClient.fitToDOM` is called, the menu will be the appropriate size. Also removes listeners that we added in the constructor.
     *
     * @memberof FinsembleMenu
     */
	onBeforeUnload() {
		let bounds = this.state.bounds;

		this.finWindow.setBounds(
			bounds.left,
			bounds.top,
			bounds.width - this.padding.width,
			bounds.height - this.padding.height);

		this.onCloseRequested();

	}
	/**
     * Cache bounds and focus on the window when it's shown.
     *
     * @memberof FinsembleMenu
     */
	onWindowShown() {
		this.finWindow.focus();
		this.cacheBounds();
	}
	/**
     * When the window is blurred, we hide the menu.
     *
     * @memberof FinsembleMenu
     */
	onWindowBlurred() {
		this.hideMenu();
	}

	/**
     * General cleanup.
     *
     * @memberof FinsembleMenu
     */
	onCloseRequested() {
		this.finWindow.removeEventListener('close-requested', this.onCloseRequested);
		this.finWindow.removeEventListener('blurred', this.onWindowBlurred);
		this.finWindow.removeEventListener('shown', this.onWindowShown);
		this.finWindow.removeEventListener('bounds-changed', this.onBoundsChanged);
	}

	/**
     * Cache bounds so that before we reload the page, we can remove padding. This prevents fitToDom from forcing the window to grow and grow on subsequent reloads.
     *
     * @memberof FinsembleMenu
     */
	cacheBounds() {
		this.finWindow.getBounds((bounds) => {
			console.log(bounds, 'cache');
			this.setState({
				bounds: bounds
			});
		});
	}
	/**
     * Calls fit to dom if the menu has padding on it.
     *
     * @memberof FinsembleMenu
     */
	componentDidMount() {
		if (this.props.padding) {
			FSBL.Clients.WindowClient.fitToDOM({
				padding: this.props.padding
			}, this.cacheBounds);
		}
	}
	render() {
		let classes = this.props.className || '';
		classes += ` ${MENU_BASE_CLASS}`;
		//Menus don't have scrollbars.
		return (<div style={{ overflow: 'hidden' }} className={classes}>
			{this.props.children}
		</div>);
	}
}
