# geohashes-along

Find the geohashes of a given precision along a GeoJSON LineString or MultiLineString Geometry or Feature.

## Installation

Using npm, `npm i geohashes-along`.

Using yarn, `yarn add geohashes-along`.

## Usage

Using `import`:

```javascript
import { getGeohashesAlong } from 'geohashes-along';
```

In a CommonJS environment:

```javascript
const { getGeohashesAlong } = require('geohashes-along');
```

Then:

```javascript
const lineString = {
  type: 'LineString',
  coordinates: [
    [-5.646972656250001, 36.679433365517774],
    [-5.52103918210534, 36.67588866176514],
  ],
};

const geohashesAlong = getGeohashesAlong(lineString, 5);
// geohashesAlong is ['eyebx', 'eys08', 'eys09', 'eys0d']
```

## Table of contents

### Functions

- [getGeohashesAlong](modules.md#getgeohashesalong)
- [getGeohashesAlongLineString](modules.md#getgeohashesalonglinestring)
- [getGeohashesAlongMultiLineString](modules.md#getgeohashesalongmultilinestring)

## Functions

### getGeohashesAlong

▸ **getGeohashesAlong**(`feature`: _Feature_<LineString \| MultiLineString\> \| LineString \| MultiLineString, `precision`: _number_): _string_[]

Get a list of geohashes along a LineString or MultiLineString GeoJSON Feature or Geometry. This is the generic method.

**`export`**

#### Parameters

| Name        | Type                                                                       | Description                        |
| :---------- | :------------------------------------------------------------------------- | :--------------------------------- |
| `feature`   | _Feature_<LineString \| MultiLineString\> \| LineString \| MultiLineString | The GeoJSON Feature or Geometry    |
| `precision` | _number_                                                                   | The precision for the geohash list |

**Returns:** _string_[]

The list of geohashes along the line

---

### getGeohashesAlongLineString

▸ **getGeohashesAlongLineString**(`lineString`: LineString, `precision`: _number_): _string_[]

Get a list of geohashes along a LineString Geometry

**`export`**

#### Parameters

| Name         | Type       | Description                        |
| :----------- | :--------- | :--------------------------------- |
| `lineString` | LineString | The LineString Geometry            |
| `precision`  | _number_   | The precision for the geohash list |

**Returns:** _string_[]

The geohashes along the LineString

---

### getGeohashesAlongMultiLineString

▸ **getGeohashesAlongMultiLineString**(`multiLineString`: MultiLineString, `precision`: _number_): _string_[]

Get a list of geohashes along a MultiLineString Geometry

**`export`**

#### Parameters

| Name              | Type            | Description                        |
| :---------------- | :-------------- | :--------------------------------- |
| `multiLineString` | MultiLineString | The MultiLineString Geometry       |
| `precision`       | _number_        | The precision for the geohash list |

**Returns:** _string_[]

The geohashes along the MultiLineString
