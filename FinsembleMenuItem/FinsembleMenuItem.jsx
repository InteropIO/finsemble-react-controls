const React = require('react');

const BUTTON_BASE_CLASS = 'menu-item';
const FinsembleMenuItemLabel = require('../FinsembleMenuItemLabel/FinsembleMenuItemLabel');
const FinsembleMenuItemActions = require('../FinsembleMenuItemActions/FinsembleMenuItemActions');
const FinsembleMenuItemAction = require('../FinsembleMenuItemAction/FinsembleMenuItemAction');
/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
const FontIcon = require('../FinsembleFontIcon/FinsembleFontIcon');
class FinsembleMenuItem extends React.Component {
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
            actionItems = [];

        //add the pin icon.
        if (this.props.isPinnable) {
            this.validateProps(['pinAction', 'isPinned']);
            //Add extra classes if the item is pinned.
            let pinIcon = this.props.isPinned ? 'ff-pin finsemble-item-pinned' : 'ff-pin';
            actionItems.push(<FinsembleMenuItemAction onClick={this.props.pinAction}><FontIcon icon={pinIcon} /></FinsembleMenuItemAction>)
        }

        //add the trashcan icon.
        if (this.props.isDeletable) {
            this.validateProp('deleteAction');
            actionItems.push(<FinsembleMenuItemAction onClick={this.props.deleteAction}><FontIcon icon='ff-delete' /></FinsembleMenuItemAction>)
        }

        //If we have a pin or deelte button, put them in the wrapper.
        if (actionItems.length) {
            actions = (
                <FinsembleMenuItemActions>
                    {actionItems}
                </FinsembleMenuItemActions>
            );
        }

        //If we have a label, set up the onClick and render the menuItemLabel.
        if (this.props.label) {
            label = (
                <FinsembleMenuItemLabel
                    menuItemProps={this.props}
                    onClick={this.props.onClick || this.props.onLabelClick}
                    className="menu-item-label-fullwidth"
                    label={this.props.label} />
            );
        } else {
            label = (
                <FinsembleMenuItemLabel
                    menuItemProps={this.props}
                    onClick={this.props.onClick || this.props.onLabelClick}
                    className="menu-item-label-fullwidth">
                    {this.props.children}
                </FinsembleMenuItemLabel>
            )
        }

        return (<div className={classes}>
            {label}
            {actions}
            {/*Only render the children if the label is defined. Otherwise we take the label and transform them into the label.*/}
            {this.props.label &&
                this.props.children}
        </div>);
    }
}
module.exports = FinsembleMenuItem;