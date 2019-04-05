# FinsembleToolbar

## Overview
This is a container designed to be a toolbar. The FinsembleToolbar is made up of [FinsembleToolbarSections](../FinsembleToolbarSection/README.md) and each section  contains other components or controls. Generally these are composed from [FinsembleButtons](../FinsembleButton/README.md). A [separator control](../FinsembleToolbarSeparator/README.md) is also available and you have the ability to use any custom controls.

![](Toolbar.png)

## Props

Currently, this has no props.

## Example

See our sample [Toolbar component](https://github.com/ChartIQ/finsemble-seed/tree/master/src/samples/toolbar) for a working example.

```jsx
<FinsembleToolbar>
	<FinsembleToolbarSection {...sectionProps1}>
		<FinsembleButton {...buttonProps1}>
		</FinsembleButton>
		...
	</FinsembleToolbarSection>
	<FinsembleToolbarSection {...sectionProps2}>
		<FinsembleButton {...buttonProps2}>
		</FinsembleButton>
		...
	</FinsembleToolbarSection>
	...
</FinsembleToolbar>
```

## Props
| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| children | ? |
| onDragEnd   	| method  	| N/A                                      	| `null`         	| Method that will be called on the onDragEnd event. |
| className    | string     |N/A                                        | `null`            | Class name for the toolbar component.               |
