/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/

const React = require('react');
const SECTION_BASE_CLASS = 'menu-section';
class FinsembleMenuSection extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			bounds: {
				height: 0
			},
			maxHeight: typeof props.maxHeight !== undefined? props.maxHeight : '100%'
		};
		this.wrapperReference = null;
		this.bindCorrectContext();
		this.finWindow = fin.desktop.Window.getCurrent();
		this.finWindow.addEventListener('shown', this.onWindowShown);
	}

	bindCorrectContext() {
		this.onBoundsChanged = this.onBoundsChanged.bind(this);
		this.onWindowShown = this.onWindowShown.bind(this);
		this.setMaxHeight = this.setMaxHeight.bind(this);

	}

	componentWillMount(){
		window.addEventListener('resize', this.onBoundsChanged);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.onBoundsChanged);
	}

	onBoundsChanged() {
		this.finWindow.getBounds((bounds) => {
			this.setState({
				bounds: bounds
			}, this.setMaxHeight);
		});
	}


	onWindowShown() {
		this.finWindow.focus();
	}

	setMaxHeight() {
		if(this.props.scrollable){
			//The maximum height is essentially the amount of real estate from the top of the element to the bottom of the window.
			let maxHeight = this.state.bounds.height - this.wrapperReference.offsetTop;
			this.setState({
				maxHeight: maxHeight
			});
		}
	}

	render() {
		let styles = {
			height: this.state.maxHeight
		}

        let classes = this.props.className || SECTION_BASE_CLASS;
        if (classes !== SECTION_BASE_CLASS) {
            //If you're unfamiliar with this syntax, it's equivalent to
		    //classes+=' ' + SECTION_BASE_CLASS;
            classes +=  ` ${SECTION_BASE_CLASS}`;
        }

		return (<div  ref={(el) => {
			this.wrapperReference = el
		}}  {...this.props} style={styles} className={classes}>
			{this.props.children}
		</div>)


	}
}
module.exports = FinsembleMenuSection;