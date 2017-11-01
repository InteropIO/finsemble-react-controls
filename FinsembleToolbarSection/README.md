# FinsembleToolbarSection

## Overview
The FinsembleToolbarSection control is the heart of the toolbar. It is used to render the sections of the Toolbar which contain all the items in the toolbar. It can automatically handle overflow in conjunction with the [FinsembleOverflowMenu](../FinsembleOverflowMenu/README.md) control.

![](Toolbar.png)

## Example

```jsx
<FinsembleToolbarSection
	className={"right"}
	clickChannel={FSBL.Clients.WindowClient.windowName + '-clickListener'}
	handleOverflow={true}
	overflowMenuStore={"OverflowMenuStore"}
	overflowMenuComponent={MenuLauncherButton}
	overflowProps={{ menuType: "Overflow Menu", label: "O" }}>

		<MenuLauncherButton label="Apps" menuType="App Launcher"></MenuLauncherButton>
		<MenuLauncherButton label="System" menuType="System Menu"></MenuLauncherButton>

</FinsembleToolbarSection>
```

## Props

| Prop					| Type				| Possible Values 	| Default Value | Description |
|--------------			|-------			| -------------		| ------------- | ----------- |
| handleOverflow		| bool   			| 					| false			| Whether this section needs to handle overflow.|
| clickChannel			| string   			| 					| 				| The Finsmble Router Channel to listen on of clicks in overflow menus.|
| overflowMenuStore		| string   			| 					| 				| The Finsemble DistributedStoreClient global store used to send overflow items to the overflow handler component.|
| overflowMenuComponent	| React Component	|					|				| A react component to be rendered when the toolbar overflows. The overflowing components are hidden and this is shown instead. Our sample Toolbar uses our sample MenuLauncherButton. The component used must be composed of a [FinsembleButton](../FinsembleButton/README.md) control. |
| overflowProps			| object   			| 					| 				| This contents of this object are passed as props to the overflowMenuComponent.|
| className				| string   			| `"right"`, `"left"`, `"center"`	| 				| The Toolbar Section must have either one of the right, left or center classes for proper styling.|

