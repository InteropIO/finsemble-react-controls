/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

import React from 'react';
const SECTION_BASE_CLASS = 'menu-section';

export default class FinsembleMenuSection extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			bounds: {
				height: 0
			},
			sectionHeight: 0,
			maxHeight: typeof props.maxHeight !== undefined ? props.maxHeight : '100%'
		};
		this.wrapperReference = null;
		this.bindCorrectContext();
		this.finWindow = fin.desktop.Window.getCurrent();
		this.finWindow.addEventListener('shown', this.onWindowShown);
	}

	bindCorrectContext() {
		this.onBoundsChanged = this.onBoundsChanged.bind(this);
		this.onWindowShown = this.onWindowShown.bind(this);
		this.applySectionHeight = this.applySectionHeight.bind(this);
	}

	componentWillMount() {
		window.addEventListener('resize', this.onBoundsChanged);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onBoundsChanged);
	}

	onBoundsChanged() {
		this.finWindow.getBounds((bounds) => {
			this.setState({
				bounds: bounds
			}, this.setSectionHeight);
		});
	}

	onWindowShown() {
		this.finWindow.focus();
	}
	componentDidUpdate() {
		this.applySectionHeight();
	}
	componentDidMount() {
		this.applySectionHeight();

	}
	applySectionHeight() {
		if (this.wrapperReference) {
			this.wrapperReference.setAttribute('style', `height:${this.getSectionHeight()}px`);
		}
	}
	getSectionHeight() {
		if (this.props.scrollable && this.wrapperReference) {
			//The maximum height is essentially the amount of real estate from the top of the element to the bottom of the window.
			let sectionHeight = Array.from(this.wrapperReference.children)
				.map(el => el.offsetHeight)
				.reduce((accumulator, currentValue) => { return accumulator + currentValue; }, 0);
			let windowFillHeight = this.state.bounds.height - this.wrapperReference.offsetTop;


			if (sectionHeight > windowFillHeight) {
				sectionHeight = windowFillHeight;
			}
			return sectionHeight;
		}
		return '100%';
	}

	render() {

		let classes = this.props.className || SECTION_BASE_CLASS;
		if (classes !== SECTION_BASE_CLASS) {
			//If you're unfamiliar with this syntax, it's equivalent to
			//classes+=' ' + SECTION_BASE_CLASS;
			classes += ` ${SECTION_BASE_CLASS}`;
		}

		return (<div ref={(el) => {
			this.wrapperReference = el;
		}}  {...this.props} className={classes}>
			{this.props.children}
		</div>);


	}
}
