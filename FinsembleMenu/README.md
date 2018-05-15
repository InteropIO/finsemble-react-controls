# FinsembleMenu

## Overview
The FinsembleMenu is a React control to help you to quickly assemble a menu. A menu is just an ephemeral Finsemble component that shows up when a button is clicked, hides when the menu loses focus, and hides on `escape`. This control provides styling, and handles those events common to all menus.

## Hierarchy
This control is part of a collection of controls. In order to make sure that your menu component has appropriate classes and styling, adhere to this hierarchy.
* **FinsembleMenu**
    * [FinsembleMenuSection](../FinsembleMenuSection/README.md)
        * [FinsembleMenuSectionLabel](../FinsembleMenuSectionLabel/README.md)
        * [FinsembleMenuItem](../FinsembleMenuItem/README.md)
            * [FinsembleMenuItemLabel](../FinsembleMenuItemLabel/README.md)
            * [FinsembleMenuItemActions](../FinsembleMenuItemActions/README.md)
                * [FinsembleMenuItemAction](../FinsembleMenuItemAction/README.md)


![](./annotated-menus-transparent.png)
## Props
| Prop               	| Type     	        | Possible Values | Default Value | Description |
|--------------	        |----------------	|-------------	  | ------------- | -------------	|
| padding            	| object   	|                                          	|               	| Padding object. By default, `FSBL.Clients.WindowClient.fitToDOM` will fit to the content of the menu. If you pass in the padding object, `fitToDOM` will give the component's innards some breathing room. |
| padding.height     	| number   	| N/A                                      	| `null`        	| Extra height to add. 	|
| padding.width      	| number   	| N/A                                      	| `null`        	| Extra width to add.  |
| className       | string    | N/A                                               | `null`  | Class name for the menu component. |
| children | ? |

## Example
The code below is the render method for our our fileMenu.
```jsx
render() {
    let padding = {
        height: 10,
        width: 40
    }
    return (<FinsembleMenu padding={padding}>
            <FinsembleMenuSectionLabel>
                Finsemble
            </FinsembleMenuSectionLabel>
            {/*Options in the file menu.*/}
            <FinsembleMenuSection className='menu-primary'>
                <FinsembleMenuItem label="Central Console" onClick={FileMenuActions.showCentralConsole}/>
                <FinsembleMenuItem label="Documentation" onClick={FileMenuActions.spawnDocs}/>
                <FinsembleMenuItem label="Logout" onClick={FileMenuActions.logout}/>
                <FinsembleMenuItem label="Quit" onClick={FileMenuActions.shutdownApplication}/>
            </FinsembleMenuSection>
    </FinsembleMenu>);
};
```
