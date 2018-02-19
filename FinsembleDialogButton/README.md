# FinsembleDialogButton

## Hierarchy
This control is part of a collection of controls. In order to make sure that your dialog component has appropriate classes and styling, adhere to this hierarchy.

* [FinsembleDialog](../FinsembleDialog/README.md)
    * [FinsembleDialogQuestion](../FinsembleDialogQuestion/README.md)
    * [FinsembleDialogTextInput](../FinsembleDialogTextInput/README.md)
    * **FinsembleDialogButton**

## Overview
This is just a wrapper for [FinsembleButton](../FinsembleButton/README.md) to give you the proper classes so that the buttons on your dialog look nice and play with our CSS.

## Example
```jsx
<FinsembleDialogButton
        show={this.state.showNegativeButton}
        buttonSize="md"
        onClick={this.sendNegativeResponse}
        title="Big Negative Button">
    {this.state.negativeResponseLabel}
</FinsembleDialogButton>
```

## Props
| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| buttonSize         	| string   	| `'sm', 'md', 'lg'`                                      	| `'md'`        	| Size of the dialog button. |
