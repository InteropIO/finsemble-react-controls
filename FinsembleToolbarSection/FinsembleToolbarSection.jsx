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
const SECTION_BASE_CLASS = 'finsemble-toolbar-section';

export default class FinsembleToolbarSection extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {};
		var self = this;
		// listener for overflow clicks
		FSBL.Clients.RouterClient.addListener(this.props.clickChannel, function (err, response) {
			self.triggerClick(response.data.index);
		});

		this.saveButtonsToOverflowStore = this.saveButtonsToOverflowStore.bind(this);
		this.onToolbarStateChanged = this.onToolbarStateChanged.bind(this);

	}

	componentWillMount() {
		let self = this;
		FSBL.Clients.DataStoreClient.createStore({ store: this.props.overflowMenuStore, global: true }, function (err, store) {
			self.overflowStore = store;
			// Listen for all toolbar changes - the toolbar must change this value -> need to redo overflow if any section changes, not just this one.
			store.addListener({ field: 'toolbarStateChanged' }, self.onToolbarStateChanged);
		});
	}

	componentWillUnmount() {
		this.overflowStore.removeListener({ field: 'toolbarStateChanged' }, self.onToolbarStateChanged);
	}

	onToolbarStateChanged(err, data) {
		if (data.value) {
			this.setState({ minOverflowIndex: 10000000 }); // this will force all components to re-render which will cause a recalculation of overflow
			store.setValue({ field: 'toolbarStateChanged', value: false });
		}
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
					overflow.push({ item: self.props.children[1][i].props, index: i });
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
		self.overflowStore.setValue({ field: 'clickChannel', value: self.props.clickChannel });
		self.overflowStore.setValue({ field: 'buttons', value: self.state.overflow });
	}

	render() {
		let classes = this.props.className || '';
		classes += ` ${SECTION_BASE_CLASS}`;
		var children = this.props.children.slice();
		var OverflowComponent = this.props.overflowMenuComponent;
		var self = this;
		return (<div className={classes} ref={(e) => { this.element = e; }}>
			{this.props.children[0]}
			{this.props.children[1].map((item, index) => {
				if (self.state.minOverflowIndex && index >= self.state.minOverflowIndex) {
					var comps = [];
					// render the overflow component
					if (index == self.state.minOverflowIndex) {
						comps.push(<OverflowComponent beforeClick={function (e) { self.saveButtonsToOverflowStore(e, self); }} {...self.props.overflowProps} key={'overflow' + index} />);
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
			{this.props.children[2]}
		</div>);
	}
}