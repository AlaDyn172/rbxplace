# RBXPlace API (Unofficial)
This module helps you retrieve all listed items from https://rbx.place website.

## Simple Installation

```javascript
npm install rbxplace
```

## Simple Use

### Load RBXPlace Items

```javascript

const RBXPlace = require("rbxplace");
const rbpl = new RBXPlace({
    ordered_by: "ASC" // Items sort default is "DESC" if not specified.
});

rbpl.loadItems(1, (items) => {
    console.log(items); // Output an array with Item Schema.
});

```

### Get $R Stock of RBXPlace
```javascript

const RBXPlace = require("rbxplace");
const rbpl = new RBXPlace({
    ordered_by: "ASC" // Items sort default is "DESC" if not specified.
});

rbpl.getStock(stock => console.log(`RBXPlace Stock is: ${stock}!`));

```

## Item Schema

```json
{
    "name": "Telamon's Chicken Suit",
    "price": 399,
    "image": "https://www.roblox.com/asset-thumbnail/image?assetId=24112667&width=250&height=250&format=png",
    "RAP": "101.7k+"
}
```