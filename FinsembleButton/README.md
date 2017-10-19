# FinsembleButton

## Overview
The finsemble Button is the base component for pretty much anything that can be clicked on in a menu or a toolbar.

## Example
### Menu opener in the toolbar
```jsx
class MenuLauncherButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let types = this.props.type || [];
        //`MenuLauncher` tells the button that I want to open a menu when it's clicked. `Toolbar` gives the button the appropriate styles to look nice on the toolbar.
		let BUTTON_TYPES = ["MenuLauncher", "Toolbar"];
		if(typeof this.props.type === 'string'){
			types = [this.props.type];
		}

		types = types.concat(BUTTON_TYPES)

		return (<FinsembleButton {...this.props} buttonType={types} />)
	}
}
```

### Generic Toolbar Button
```jsx
return (<FinsembleButton
            className={classes}
            hide={this.props.someConditionalValue}
            label="My great button"
            fontIcon="ff-grid"
            iconClasses="give-my-button-extra-space-on-the-right"
            iconPosition="Right"
            buttonType="Toolbar"
            onClick={this.handleClick}
            tooltip="This is a button that does nothing">
            {this.props.children}
        </FinsembleButton>)

```

## Props
| Prop         	|  Type           	| Possible values | Default value | Description 	|
|--------------	|----------------	|-------------	  | ------------- | -------------	|
| label        	| string         	| N/A | `null` | Label for your button.         	|
| tooltip      	| string         	| N/A | `null` | Tooltip to appear when your button is hovered over. This may also be set by using the 'title' html attribute.             	|
| iconPosition 	| string         	| `'left', 'right'`| `'left'` | If an icon is present, the button allows you to position it to the left or to the right of the button's label.            	|
| iconClasses  	| string         	| N/A | `null` | Additional classes that you'd like to add to your font-icon or image.            	|
| buttonType         	| string/array 	| `'Toolbar', 'MenuItemLabel', 'MenuItemAction', 'Dialog', 'MenuLauncher'` | `null` | Type of button. The values to the left are pre-defined button types that we provide out of the box. These types confer specific css classes and/or predefined functionality.            	|
| menuType     	| string         	| N/A | `null` | This is the value of any valid finsemble component. When `onClick` is fired for a `MenuLauncher` button, we spawn the component found in this property. See below for an example.             	|
| fontIcon     	| string         	| N/A | `null` | Any CSS classes that you'd like to go on a font icon element.            	|
| icon         	| URL            	| N/A | `null` | The URL of an image that you'd like to take the place of a font-icon in a label           	|
| onClick      	| method         	| `function` | `null` | Method to be invoked when the user clicks on your button. **NOTE** This method is overwritten if your button type is `MenuLauncher`          	|
| beforeClick	| method		| `function`	|	| Method that receives the click event and is executed before the default onClick action specified by onClick. This allows the specification of multiple actions to occur on click for components build using composition from this one. |
| afterClick	| method		| `function`	|	| Method that receives the click event and is executed after the default onClick action specified by onClick. |
| show         	| boolean        	|`true, false`| `true` |Whether to show the button. Hide overrides show.            	|
