/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

/**
 * The FinsembleToolbarSection control shows bunch of toolbar buttons or other custom React components. It optionally handles overflow if the contents do not fit.
 *
 * How overflow render works:
 *  Initial Load: Render everything -> componentDidUpdate() fires -> calculate overflow -> If needed rerender
 *  On Update: (toolbarStateChanged) -> set minOverflowIndex to something big so component rerenders -> componentDidUpdate() fires -> calculate overflow -> If needed rerender
 *
 * How overflow is handled
 *  The Overflow handling component will receive a list of buttons that overflowed.
 *  It needs to render those buttons and when clicked, transmit the index of the clicked item back to the toolbar on the clickChannel
 *
 */

import React from 'react';
import FinsembleButton from '../FinsembleButton/FinsembleButton';
const SECTION_BASE_CLASS = 'finsemble-toolbar-section';

export default class FinsembleToolbarSection extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			clickChannel: this.props.clickChannel || FSBL.Clients.WindowClient.windowName + '-overflow-clickChannel'
		};
		var self = this;


		this.processPins = this.processPins.bind(this);
	}

	// Process pin changes on the toolbar store
	processPins(err, data) {
		var pins = data.value;
		if (!pins) { return }
		var pinArray = [];
		var newPins = [];
		var myPins = [];
		var pinsChanged = false;
		if (pins) {
			for (var i in pins) {
				var pin = pins[i];
				if (pin) {
					if (!pin.index) {
						newPins.push(pin);
					} else {
						if (pinArray[pin.index]) {
							pin.index = pinArray.length;
							pinArray[pin.index] = pin;
							pinsChanged = true;
						} else {
							pinArray[pin.index] = pin;
						}
						//if (pin.toolbarSection == this.props.name) myPins[pin.index] = pin;
					}
				} else {
					delete pins[i];
					pinsChanged = true;
				}
			}
		}
		if (newPins.length) {
			var nextIndex = pinArray.length;
			for (var i = 0; i < newPins.length; i++) {
				var pin = newPins[i];
				if (pin) {
					pin.index = nextIndex + 1;
					pinArray.push(pin);
					//if (pin.toolbarSection == this.props.name) myPins[pin.index] = pin;
					pinsChanged = true;
				}
			}
		}

		// If pins have changed, rerender
		if (pinsChanged || this.initialLoad) {
			for (var i = 0; i < pinArray.length; i++) {
				if (pinArray[i] && pinArray[i].toolbarSection == this.props.name) myPins.push(pinArray[i]);
			}
			this.setState({ pins: myPins });
			FSBL.Clients.StorageClient.save({ topic: "finsemble", key: "toolbarPins", value: pins });
			this.state.pinStore.setValue({ field: 'pins', value: pins });
			this.initialLoad = false;
		}

	}

	/**
	 * Spawn a menu
	 *
	 */
	spawnMenu(menu) {
		let windowName = menu.menuType + (menu.label ? menu.label : menu.tooltip);
		const COMPONENT_UPDATE_CHANNEL = `${windowName}.ComponentsToRender`;
		FSBL.Clients.LauncherClient.showWindow({
			windowName: windowName,
			componentType: menu.menuType
		}, { spawnIfNotFound: true }, function (err, response) {
			FSBL.Clients.RouterClient.publish(COMPONENT_UPDATE_CHANNEL, menu.customData);
		});
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		var self = this;
		if (this.props.handleOverflow) {
			// overflow handling
			if (this.props.overflowMenuComponent) {
				this.state.overflowMenuComponent = this.props.overflowMenu;
				this.state.overflowMenuProps = this.props.overflowMenuProps;
			} else {
				this.state.overflowMenuComponent = FinsembleButton;
				this.state.overflowMenuProps = {
					buttonType: ["Toolbar", "MenuLauncher"],
					menuType: "Overflow Menu",
					title: "Overflow",
					fontIcon: "ff-caret-down"
				};
			}

			var overflowMenuStoreName = this.props.overflowMenuStoreName || "OverflowMenuStore";

			// create/get a store for checking if overflowmenu has been spawned. If not, spawn
			FSBL.Clients.DistributedStoreClient.createStore({ global: true, store: overflowMenuStoreName }, function (err, store) {
				self.setState({ overflowStore: store });
				store.getValue({ field: 'menuSpawned' }, function (err, menuSpawned) {
					if (!menuSpawned) {
						self.spawnMenu(self.state.overflowMenuProps);
					}
					store.setValue({ field: 'menuSpawned', value: true });
				});
			});

			// listener for overflow clicks
			FSBL.Clients.RouterClient.addListener(this.state.clickChannel, function (err, response) {
				self.triggerClick(response.data.index);
			});

		}

		if (this.props.handlePins) {
			FSBL.Clients.DistributedStoreClient.createStore({ global: true, store: 'Finsemble-Toolbar-Store' }, function (err, store) {
				// Load pins from storage
				self.setState({ pinStore: store });
				FSBL.Clients.StorageClient.get({ topic: "finsemble", key: "toolbarPins" }, function (err, pins) {
					store.setValue({ field: 'pins', value: pins })
					self.initialLoad = true;
				});
				store.addListener({ field: 'pins' }, self.processPins);
			});
		}

	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
		self.state.pinStore.removeListener({ field: 'pins' }, self.processPins);
	}

	handleResize(e) {
		this.setState({ minOverflowIndex: 10000000 }); // this will force all components to re-render which will cause a recalculation of overflow
	}

	/**
     * Trigger a click on the proper item. index + 1 because overflow menu launching component is added.
     *
     * @param {number} index
     * @memberof FinsembleToolbarSection
     */
	triggerClick(index) {
		this.element.children[index + 1].children[0].click();
	}

	/**
     * Do we have an overflow? Assumes 40 as the size of the overflow component -> TODO: make this dynamic.
     *
     * @returns
     * @memberof FinsembleToolbarSection
     */
	hasOverflow() {
		var e = this.element;
		return (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth - 40);
	}

	/**
     * Here if we have overflow, force a rerender by setting the state. state.overflow = overflowing items. state.minOverflowIndex = where overflow starts, i.e. hide items starting there
     *
     * @returns
     * @memberof FinsembleToolbarSection
     */
	componentDidUpdate() {
		if (!this.props.handleOverflow) return;
		var self = this;

		if (self.hasOverflow()) {
			var e = self.element;
			var right = e.offsetLeft + e.offsetWidth - 40;
			var overflow = [];
			for (var i = 0; i < e.children.length; i++) {
				var item = e.children[i];
				if ((item.offsetLeft + item.offsetWidth) > right) {
					overflow.push({ item: self.children[i].props, index: i });
				}
			}
			self.setState({
				overflow: overflow,
				minOverflowIndex: overflow[0].index
			});
		}
	}

	/**
     * This is used on clicking the overflow component. It adds the communication channel for clicks and the overflowing items to the overflowMenuStore.
     * beforeClick (see FinsembleButton) is used because this needs to happen before the default click action.
     *
     * @param {any} e
     * @param {any} self
     * @memberof FinsembleToolbarSection
     */
	saveButtonsToOverflowStore(e, self) {
		self.state.overflowStore.setValue({ field: 'clickChannel', value: self.state.clickChannel });
		self.state.overflowStore.setValue({ field: 'buttons', value: self.state.overflow });
	}

	renderpins() {
		if (!this.state.pins) { return [] }
		var components = [];
		for (var i = 0; i < this.state.pins.length; i++) {
			var pin = this.state.pins[i];
			if (!pin) continue;
			var Component = this.props.pinnableItems[pin.type];
			switch (pin.type) {
				case 'componentLauncher':
					components.push(<Component key={i} iconClasses="pinned-icon" buttonType={["AppLauncher", "Toolbar"]} {...pin} />);
					break;
				default:
					components.push(<Component key={i} {...pin} />);
					break;
			}
		}
		return components;
	}

	render() {
		let classes = this.props.className || '';
		classes += ` ${SECTION_BASE_CLASS}`;

		this.children = this.props.handlePins ? this.renderpins() : this.props.children;
		var OverflowComponent = this.state.overflowMenuComponent;
		var self = this;
		var section = (<div className={classes} ref={(e) => { this.element = e; }}>
			{Array.isArray(this.children) && this.children.map((item, index) => {
				if (self.state.minOverflowIndex && index >= self.state.minOverflowIndex) {
					var comps = [];
					// render the overflow component
					if (index == self.state.minOverflowIndex) {
						comps.push(<OverflowComponent beforeClick={function (e) { self.saveButtonsToOverflowStore(e, self); }} {...self.state.overflowMenuProps} key={'overflow' + index} />);
					}
					// render the rest of the components hidden
					comps.push(<div style={{ display: 'none' }}>{item}</div>);
					if (self.element && !self.element.className.includes('overflow')) self.element.className += ' overflow';
					return comps;


				} else {
					if (self.element && self.element.className.includes('overflow')) self.element.className = self.element.className.replace('overflow', '');
					return item;
				}
			})}
		</div>);
		return section;
	}
}