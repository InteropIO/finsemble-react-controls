# FinsembleDialogQuestion

## Hierarchy
This control is part of a collection of controls. In order to make sure that your dialog component has appropriate classes and styling, adhere to this hierarchy.

* [FinsembleDialog](../FinsembleDialog/README.md)
    * **FinsembleDialogQuestion**
    * [FinsembleDialogTextInput](../FinsembleDialogTextInput/README.md)
    * [FinsembleDialogButton](../FinsembleDialogButton/README.md)

## Overview
This is just a wrapper that adds some classes so that the dialog question looks nice and play with our CSS.

## Props
| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| question         	| string   	| N/A                                      	| `null`        	| Label for the primary question on your dialog. |

## Example
### Using Composition
```jsx
<FinsembleDialogQuestion>
    {this.state.question}
</FinsembleDialogQuestion>
```

### Using Props
```jsx
<FinsembleDialogQuestion question={this.state.question}/>
```
