import React from 'react';
import FinsembleMenuItemLabel from '../FinsembleMenuItemLabel/FinsembleMenuItemLabel';
import FontIcon from '../FinsembleFontIcon/FinsembleFontIcon';

const BUTTON_BASE_CLASS = 'menu-item';

/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
export default class FinsembleMenuItem extends React.Component {
	constructor(props) {
		super(props);
	}
	/**
	 * Helper to validate properties and to throw errors if they're missing.
	 *
	 * @param {any} propName
	 * @memberof Button
	 */
	validateProp(propName) {
		if (typeof this.props[propName] === 'undefined') {
			throw new Error(`Missing Requeired Prop on FinsembleMenuItem: ${propName}`);
		}
	}
	/**
	 * Loops through and calls validateProp.
	 *
	 * @param {any} arr
	 * @memberof Button
	 */
	validateProps(arr) {
		arr.forEach((propName) => {
			this.validateProp(propName);
		});
	}

	render() {
		let classes = this.props.className || BUTTON_BASE_CLASS;
		if (classes !== BUTTON_BASE_CLASS) {
			//If you're unfamiliar with this syntax, it's equivalent to
			//classes+=' ' + BUTTON_BASE_CLASS;
			classes += ` ${BUTTON_BASE_CLASS}`;
		}

		let actions = null,
			label = null,
			title = null,
			actionItems = [];

		//add the trashcan icon.
		if (this.props.isDeletable) {
			this.validateProp('deleteAction');
			actionItems.push(<div title="Delete" key="delete" className="menu-item-action" onClick={this.props.deleteAction}><FontIcon icon='ff-adp-trash-outline' /></div>);
		}

		//add the pin icon.
		if (this.props.isPinnable) {
			this.validateProps(['pinAction', 'isPinned']);
			//Add extra classes if the item is pinned.
			let pinIconClass = this.props.pinIcon || 'ff-pin';
			let activePinClass = this.props.activePinModifier || 'finsemble-item-pinned';
			let pinIcon = this.props.isPinned ? `${pinIconClass} ${activePinClass}` : pinIconClass;
			actionItems.push(<div key="pin" className="menu-item-action" title={this.props.isPinned ? "Unfavorite" : "Favorite"} onClick={this.props.pinAction}><FontIcon icon={pinIcon} /></div>);
		}


		//If we have a pin or deelte button, put them in the wrapper.
		if (actionItems.length) {
			actions = (
				<div className='menu-item-actions'>
					{actionItems}
				</div>
			);
		}

		//If we have a label, set up the onClick and render the menuItemLabel.
		if (this.props.label) {
			label = (
				<FinsembleMenuItemLabel
					menuItemProps={this.props}
					draggable={this.props.draggable}
					onDragStart={this.props.onDragStart}
					onDrag={this.props.onDrag}
					onDragEnd={this.props.onDragEnd}
					onClick={this.props.onClick || this.props.onLabelClick}
					className="menu-item-label-fullwidth"
					label={this.props.label} 
					title={this.props.label} />
			);
		}

		return (<div className={classes}>
			{label}
			{actions}
			{/*Only render the children if the label is defined. Otherwise we take the label and transform them into the label.*/}
			{this.props.children}
		</div>);
	}
}