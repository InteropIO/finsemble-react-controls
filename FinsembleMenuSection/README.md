# FinsembleMenuSection

## Hierarchy
This component is part of a collection of components. In order to make sure that your component has appropriate classes and styling, adhere to this hierarchy.

* [FinsembleMenu](../FinsembleMenu/README.md)
    * **FinsembleMenuSection**
        * [FinsembleMenuSectionLabel](../FinsembleMenuSectionLabel/README.md)
        * [FinsembleMenuItem](../FinsembleMenuItem/README.md)
            * [FinsembleMenuItemLabel](../FinsembleMenuItemLabel/README.md)
            * [FinsembleMenuItemActions](../FinsembleMenuItemActions/README.md)
                * [FinsembleMenuItemAction](../FinsembleMenuItemAction/README.md)

![](../FinsembleMenu/annotated-menus-transparent.png)

## Overview
The MenuSection is a react component that MenuItems should be placed in. If you'd like, it can be scrollable. If you set a maxHeight, it will not grow beyond that height. If you do not, it will fill the finWindow.

## Props
| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| scrollable         	| boolean  	| `true, false`                            	| `false`       	| Whether the menu section is scrollable. Right now if you do not set a maxHeight, it will occupy the remainder of the vertical space in the component. |
| maxHeight          	| number   	| N/A                                      	| `null`        	| Maximum height for the section. If the section is scrollable, the default is to fill the remaining height in the openfin window. |


## Example
This is taken from our WorkspaceManagementMenu. `{workspaces}` is an array of `<FinsembleMenuItem>`s.
```jsx
<FinsembleMenuSection className='menu-primary'>
    <FinsembleMenuSectionLabel>
        Workspaces
    </FinsembleMenuSectionLabel>
    {workspaces}
</FinsembleMenuSection>)
```

This is from our appLauncher. The list of components is scrollable.
```jsx
(<FinsembleMenuSection scrollable={true} className="ComponentList">
    {componentList}
</FinsembleMenuSection>);
```