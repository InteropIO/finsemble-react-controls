/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
import React from 'react';
import FinsembleMenu from '../FinsembleMenu/FinsembleMenu';
import FinsembleMenuItem from '../FinsembleMenuItem/FinsembleMenuItem';
import FinsembleMenuSection from '../FinsembleMenuSection/FinsembleMenuSection';

export default class FinsembleOverflowMenu extends React.Component {
	constructor(props) {
		// Build a store for overflow
		super(props);
		var self = this;
		self.state = {
			buttons: []
		};
		this.onStateChange = props.onStateChange || function noop() { };
		this.buttonChangeListener = this.buttonChangeListener.bind(this);
		this.clickChannelListener = this.clickChannelListener.bind(this);
		this.pinListListener = this.pinListListener.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.onClick = this.onClick.bind(this);
	}
	/**
	 * A message has been sent from the toolbar section that spawned the menu. This happens when the pins that need to be rendered in the list are updated (add/remove/reorder(possibly)).
	 * @param {*} err
	 * @param {*} response
	 */
	buttonChangeListener(err, response) {
		if (response.value) {
			this.setState({ buttons: response.value }, self.onStateChange);
		}
	}
	/**
	 * Happens when we have a new toolbar takes ownership of the menu. The 'clickChannel' is the place where we send click events and pin reorders to.
	 * @param {*} err
	 * @param {*} response
	 */
	clickChannelListener(err, response) {
		if (response.value) {
			this.setState({ clickChannel: response.value }, self.onStateChange);
		}
	}
	/**
	 * Listens in the toolbar store for changes to pins.
	 * We use this to calculate the offset when reordering the overflow menu.
	 * @param {*} err
	 * @param {*} response
	 */
	pinListListener(err, response) {
		if (response.value) {
			this.setState({ pins: response.value }, self.onStateChange);
		}
	}

	/**
	 * Fired when the user finishes draggin an item in the overflow menu
	 * @param {*} changeEvent
	 */
	onDragEnd(changeEvent) {
		//Happens when the user drops outside of the dom, or doesn't move the item
		if (!changeEvent.destination) return;
		//This block handles local state. We reorder locally, then calculate the offset for the main list of pins. After that, we broadcast it so back to the toolbarSection that spawned the overflow menu. It dispatches the change to all toolbars.
		let buttons = this.state.buttons;
		let newButtons = JSON.parse(JSON.stringify(buttons));
		let target = newButtons[changeEvent.source.index];
		let offset = this.state.pins.length - this.state.buttons.length;

		newButtons.splice(changeEvent.source.index, 1);
		newButtons.splice(changeEvent.destination.index, 0, target);
		//Remove empty buttons (just in case)
		//Reset the indices.
		newButtons = newButtons.filter(btn => btn)
			.map((btn, i) => {
				btn.index = i + offset;
				btn.item.index = i + offset;
				return btn;
			});
		//Change the offset so that when the toolbar receives the changeEvent, it doesn't try swapping the first or second pin (index 0 or 1).
		changeEvent.source.index += offset;
		changeEvent.destination.index += offset;

		//Set state locally so that the list doesn't jitter.
		this.setState({ buttons: newButtons });
		//Sends a message to the toolbar section; it dispatches an event on the toolbar store so that all toolbars update.
		FSBL.Clients.RouterClient.transmit(this.state.clickChannel, { changeEvent: changeEvent });

	}
	// This onClick applies to the FinsembleMenuItemLabel inside the FinsembleMenuItem.
	onClick(e, buttonIndex) {
		//The props of the MenuItem itself are passed to the Label as menuItemProps.
		FSBL.Clients.RouterClient.transmit(this.state.clickChannel, { index: buttonIndex });
		FSBL.Clients.WindowClient.finsembleWindow.hide();
	}

	componentWillMount() {
		var self = this;
		FSBL.Clients.DistributedStoreClient.createStore({ store: this.props.overflowMenuStore, global: true }, function (err, store) {
			self.setState({ store: store });
			store.getValue('buttons', function (err, response) {

			});
			store.addListener({ field: 'pins' }, self.pinListListener);
			store.addListener({ field: 'buttons' }, self.buttonChangeListener);
			store.addListener({ field: 'clickChannel' }, self.clickChannelListener);
		});
	}

	componentDidUpdate() {
		FSBL.Clients.WindowClient.fitToDOM();
	}

	componentWillUnmount() {
		this.state.store.removeListener({ field: 'buttons' }, this.buttonChangeListener);
		this.state.store.removeListener({ field: 'clickChannel' }, this.clickChannelListener);
	}

	render() {
		if (!this.state.buttons || !this.state.buttons.length) return null;
		var self = this;

		return <FinsembleMenu {...this.props}>
			<FinsembleMenuSection onDragEnd={this.onDragEnd} {...this.props} className='menu-primary'>
				{this.state.buttons.map((button) => {
					return <FinsembleMenuItem clickChannel={self.state.clickChannel} {...button.item} key={button.index} clickIndex={button.index} onClick={(e) => self.onClick(e, button.index)} />;
				})}
			</FinsembleMenuSection>
		</FinsembleMenu>;
	}
}

