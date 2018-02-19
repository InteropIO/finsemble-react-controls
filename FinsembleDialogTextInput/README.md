# FinsembleDialogTextInput

## Hierarchy
This control is part of a collection of controls. In order to make sure that your dialog component has appropriate classes and styling, adhere to this hierarchy.

* [FinsembleDialog](../FinsembleDialog/README.md)
    * [FinsembleDialogQuestion](../FinsembleDialogQuestion/README.md)
    * **FinsembleDialogTextInput**
    * [FinsembleDialogButton](../FinsembleDialogButton/README.md)

## Overview
The DialogTextInput is simply a text field with the appropriate CSS to look nice inside of a dialog. It's designed to be the focal point of the dialog.

## Props

| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| inputLabel         	| string   	| N/A                                      	| `null`        	| Label for the text field. Typically not used; the [FinsembleDialogQuestion](../FinsembleDialogQuestion/README.md) will typically serve as the label. |
| onInputChange      	| function 	| `function`                               	| `null`        	| Function to fire when the element's value changes ||

## Example
```jsx
    <FinsembleDialogTextInput onInputChange={this.setInputValue}/>
```
