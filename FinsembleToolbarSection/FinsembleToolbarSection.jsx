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
import FinsembleDraggable from '../FinsembleDraggable/FinsembleDraggable';
import FinsembleDroppable from '../FinsembleDroppable/FinsembleDroppable';


import React from 'react';
import FinsembleButton from '../FinsembleButton/FinsembleButton';
const SECTION_BASE_CLASS = 'finsemble-toolbar-section';

// Put the thing into the DOM!
export default class FinsembleToolbarSection extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			pins: [],
			clickChannel: this.props.clickChannel || FSBL.Clients.WindowClient.windowName + '-overflow-clickChannel'
		};
		var self = this;


		this.processPins = this.processPins.bind(this);
	}

	// Process pin changes on the toolbar store
	processPins(err, data) {
		if (!data.value) { return; }
		//Pins are saved to storage and rendered as an array. When we persist to the distributed store, we convert the pins to an object.
		function pinsToArray(obj) {
			let arr = [];
			for (let i in obj) {
				let pin = obj[i];
				if (!pin) continue;
				if (typeof (pin.index) === 'undefined') {
					pin.index = arr.length;
				}
				arr[pin.index] = pin;
			}
			return arr.filter((el) => el !== null);
		}
		function pinsToObj(arr) {
			let obj = {};
			arr.forEach((el, i) => {
				if (el) {
					let key = el.label;
					obj[key] = el;
					obj[key].index = i;
				}
			});
			return obj;
		}
		let storedPins = this.state.pins,
			incomingPins = data.value,
			pinsChanged = false;

		if (!Array.isArray(data.value)) {
			incomingPins = pinsToArray(data.value);
		}

		let orderChanged = incomingPins.some((pin, index) => {
			let storedPin = storedPins[index], incomingPin = incomingPins[index];
			if (storedPin && incomingPin) {
				return storedPins[index].label !== incomingPins[index].label;
			}
			return true;
		});

		//Either a pin was added or removed.
		if (incomingPins.length !== storedPins.length) {
			pinsChanged = true;
		} else if (orderChanged) {
			pinsChanged = true;
		}

		// If pins have changed, rerender
		if (pinsChanged || this.initialLoad) {
			let pinObj = pinsToObj(incomingPins);
			this.setState({ pins: incomingPins, minOverflowIndex: 1000000 });
			FSBL.Clients.StorageClient.save({ topic: 'finsemble', key: 'toolbarPins', value: incomingPins });
			this.state.pinStore.setValue({ field: 'pins', value: pinObj });
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
					buttonType: ['Toolbar', 'MenuLauncher'],
					menuType: 'Overflow Menu',
					title: 'Overflow',
					fontIcon: 'ff-caret-down',
					preSpawn: true
				};
			}

			var overflowMenuStoreName = this.props.overflowMenuStoreName || 'OverflowMenuStore';

			// create/get a store for checking if overflowmenu has been spawned. If not, spawn
			FSBL.Clients.DistributedStoreClient.createStore({ global: true, store: overflowMenuStoreName }, function (err, store) {

				self.setState({ overflowStore: store });
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
				FSBL.Clients.StorageClient.get({ topic: 'finsemble', key: 'toolbarPins' }, function (err, pins) {
					store.setValue({ field: 'pins', value: pins });
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
		return (e.offsetWidth < e.scrollWidth - 40);
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
		function getComponentProps(cmp){
			//if the component has children, we want the properties of the child..if not, we want the component's properties. the overflow menu needs those.
			//@todo, do this better. give the cmp a unique id that we can grab from props or props.children...just traverse the tree until we find it.
			if (cmp.props.children) {
				return cmp.props.children.props;
			}
			return cmp.props;
		}
		if (self.hasOverflow()) {
			var e = self.element;
			var right = e.offsetLeft + e.offsetWidth - 40;
			var overflow = [];
			var minOverflowIndex = 10000000;
			for (var i = 0; i < e.children.length; i++) {
				var item = e.children[i];
				if ((item.offsetLeft + item.offsetWidth) > right) {
					minOverflowIndex = i;
				}
				if (i >= minOverflowIndex) {
					overflow.push({ item: getComponentProps(self.children[i]), index: i });
				}
			}
			debugger //eslint-disable-line
			self.setState({
				overflow: overflow,
				minOverflowIndex: (overflow[0] ? overflow[0].index : minOverflowIndex)
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
		debugger;//eslint-disable-line
		self.state.overflowStore.setValue({ field: 'clickChannel', value: self.state.clickChannel });
		function makeButtonsSafeForRouter(overflow) {
			return overflow.map((el) => {
				delete el.item.children;
				return el;
			});
		}
		let buttons = makeButtonsSafeForRouter(self.state.overflow);
		self.state.overflowStore.setValue({
			field: 'buttons',
			value: buttons
		});
	}

	renderpins() {
		if (!this.state.pins) { return []; }
		var components = [];
		for (let i = 0; i < this.state.pins.length; i++) {
			let pin = this.state.pins[i];
			if (!pin) continue;
			let Component = this.props.pinnableItems[pin.type];
			let cmp;
			switch (pin.type) {
			case 'componentLauncher':
				cmp = <Component key={i} iconClasses="pinned-icon" buttonType={['AppLauncher', 'Toolbar']} {...pin} />;
				break;
			default:
				cmp = <Component key={i} {...pin} />;
				break;
			}
			if (this.props.arrangeable) {
				components.push(
					<FinsembleDraggable
						wrapperClass="fullHeightFlex"
						draggableId={pin.uuid} index={i}>
						{cmp}
					</FinsembleDraggable>);
			} else {
				components.push(cmp);
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
		if (this.props.arrangeable) {
			return (<FinsembleDroppable classes={classes} direction="horizontal" droppableId="droppable">
				{section}
			</FinsembleDroppable>);
		} else {
			return section;
		}

	}
}