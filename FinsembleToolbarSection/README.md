# FinsembleToolbarSection

## Overview
The FinsembleToolbarSection control is the heart of the toolbar. It is used to render the sections of the Toolbar which contain all the items in the toolbar. It can automatically handle overflow in conjunction with the [FinsembleOverflowMenu](../FinsembleOverflowMenu/README.md) control.

![](Toolbar.png)

## Example

### Toolbar
```jsx
<FinsembleToolbarSection name="right" className="right">
		<MenuLauncherButton label="Apps" menuType="App Launcher"></MenuLauncherButton>
		<MenuLauncherButton label="System" menuType="System Menu"></MenuLauncherButton>
</FinsembleToolbarSection>

<FinsembleToolbarSection name="center" className="center" handleOverflow={true} handlePins={true}/>
```

### Pinning

## Props

| Prop					| Type				| Possible Values 	| Default Value | Description |
|--------------			|-------			| -------------		| ------------- | ----------- |
| className				| string   			| `"right"`, `"left"`, `"center"`	| 				| The Toolbar Section must have either one of the right, left or center classes for proper styling.|
| name					| string   			| 					| 				| Toolbar sections that handle pins must have unique names so components that use the pinning functionality can specify where the items get pinned. |
| handleOverflow		| bool   			| 					| false			| Whether this section needs to handle overflow.|
| handlePins			| bool   			| 					| false			| Whether this section needs to handle pinned components. In this case the children are ignored and only pins are shown.|
| clickChannel 			| string   			| 					| 				| (Optional) The Finsmble Router Channel to listen on of clicks in overflow menus. Use if you need to use a custom component to manage overflow. |
| overflowMenuStoreName 	| string   			| 					| 				| (Optional) The Finsemble DataStoreClient global store used to send overflow items to the overflow handler component. Use if you need to use a custom component to manage overflow.|
| overflowMenu	| React Component	|					|				| (Optional) A react component to be rendered when the toolbar overflows. The overflowing components are hidden and this is shown instead. Our sample Toolbar uses our sample MenuLauncherButton. The component used must be composed of a [FinsembleButton](../FinsembleButton/README.md) control. Use if you need to use a custom component to manage the launching of the overflow handling Component. |
| overflowMenuProps			| object   			| 					| 				| (Optional) This contents of this object are passed as props to the overflowMenuComponent.|
| arrangeable     | ? |
| children        | ? |

