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
		this.clickChannelListner = this.clickChannelListner.bind(this);

	}

	buttonChangeListener(err, response) {
		if (response.value) {
			this.setState({ buttons: response.value }, self.onStateChange);
		}
	}

	clickChannelListner(err, response) {
		if (response.value) {
			this.setState({ clickChannel: response.value }, self.onStateChange);
		}
	}

	componentWillMount() {
		var self = this;
		FSBL.Clients.DataStoreClient.createStore({ store: this.props.overflowMenuStore, global: true }, function (err, store) {
			self.setState({ store: store });
			store.getValue('buttons', function (err, response) {

			});

			store.addListener({ field: 'buttons' }, self.buttonChangeListener);

			store.addListener({ field: 'clickChannel' }, self.clickChannelListner);
		});
	}

	componentDidUpdate() {
		FSBL.Clients.WindowClient.fitToDOM();
	}

	componentWillUnmount() {
		this.state.store.removeListener({ field: 'buttons' }, this.buttonChangeListener);
		this.state.store.removeListener({ field: 'clickChannel' }, this.clickChannelListner);
	}

	// This onClick applies to the FinsembleMenuItemLabel inside the FinsembleMenuItem.
	onClick(e) {
		//The props of the MenuItem itself are passed to the Label as menuItemProps.
		FSBL.Clients.RouterClient.transmit(this.props.menuItemProps.clickChannel, { index: this.props.menuItemProps.clickIndex });
	}

	render() {
		if (!this.state.buttons || !this.state.buttons.length) return null;
		var self = this;

		return <FinsembleMenu>
			<FinsembleMenuSection className='menu-primary'>
				{this.state.buttons.map((button) => {
					return <FinsembleMenuItem clickChannel={self.state.clickChannel} {...button.item} key={button.index} clickIndex={button.index} onClick={self.onClick} />;
				})}
			</FinsembleMenuSection>
		</FinsembleMenu>;
	}
}

