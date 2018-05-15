# FinsembleOverflowMenu

## Overview
The FinsembleOverflowMenu control is designed to automatically handle overflow from toolbar sections. It uses the Store Client to receive a list of items that mirror toolbar buttons. It then displays those items as FinsembleMenuItems inside a FinsembleMenu. The click action for the menu items is to transmit the index of the clicked item to the toolbar section that it is handling the overflow for.

## Props
| Prop         	|  Type         | Possible values | Default value | Description 	|
|--------------	|--------------	|-------------	  | ------------- | -------------	|
| overflowMenuStore        	| string        |  |  | The name of the Global DataStore created using the DistributedStoreClient used to send this a list of overflow items.         	|
| onStateChange  | method      | N/A               | empty function  | Method that will get called whenever the state is set. |

## overflowMenuStore
The store passed to overflowMenu must contain

| Item  | Description   |
|---|---|
| buttons | A list of buttons from the toolbar section |
| clickChannel | The channel to transmit the index of the clicked item |

## Example
```jsx
<FinsembleOverflowMenu overflowMenuStore="overFlowMenuStore1" />
```
