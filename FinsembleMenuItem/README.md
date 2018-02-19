# FinsembleMenuItem

## Hierarchy
This control is part of a collection of controls. In order to make sure that your Menu component has appropriate classes and styling, adhere to this hierarchy.

* [FinsembleMenu](../FinsembleMenu/README.md)
    * [FinsembleMenuSection](../FinsembleMenuSection/README.md)
        * [FinsembleMenuSectionLabel](../FinsembleMenuSectionLabel/README.md)
        * **FinsembleMenuItem**
            * [FinsembleMenuItemLabel](../FinsembleMenuItemLabel/README.md)
            * [FinsembleMenuItemActions](../FinsembleMenuItemActions/README.md)
                * [FinsembleMenuItemAction](../FinsembleMenuItemAction/README.md)

![](../FinsembleMenu/annotated-menus-transparent.png)
## Overview

## Props
| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| label              	| string   	| N/A                                      	| `null`        	| Label for the menu action.|
| onClick            	| function 	| N/A                                      	| `null`        	| Main action for the menu item. If there are no menu actions present, the item will occupy the full width of its parent container; if any of that div is clicked, this function is invoked. |
| onLabelClick       	| function 	| N/A                                      	| `null`        	| Alias for onClick.        |
| isPinnable         	| boolean  	| `true, false`                            	| `false`       	| Whether the item can be pinned to the toolbar.|
| isPinned           	| boolean  	| `true, false`                            	| `false`       	| Whether the item is currently pinned to the toolbar. |
| pinAction          	| funciton 	| N/A                                      	| `null`        	| What to do when the user tries to pin the item |
| isDeletable        	| boolean  	| `true, false`                            	| `false`       	| Whether it's possible to remove the item from the menu.|
| deleteAction       	| function 	| N/A                                      	| `null`        	| How to remove the item from the menu. |

## Examples
### Simple example
```jsx
	<FinsembleMenuItem label="Logout" onClick={FileMenuActions.logout}/>
```

### Pinnable and deletable item (e.g., custom component in the app launcher)
```jsx
	<FinsembleMenuItem label={this.props.name}
        onLabelClick={function () {
            itemAction(component, {})
        }}
        isDeletable={this.props.isUserDefined}
        deleteAction={this.deleteItem}
        isPinnable={true}
        isPinned={this.props.isPinned}
        pinAction={function () {
            togglePin(component)
        }}/>;
```
