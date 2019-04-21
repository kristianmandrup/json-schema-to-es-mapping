# Geo points

```
PUT /attractions/restaurant/1
{
  "name":     "Chipotle Mexican Grill",
  "location": "40.715, -74.011"
}

PUT /attractions/restaurant/2
{
  "name":     "Pala Pizza",
  "location": {
    "lat":     40.722,
    "lon":    -73.989
  }
}

PUT /attractions/restaurant/3
{
  "name":     "Mini Munchies Pizza",
  "location": [ -73.983, 40.719 ]
}
```

- A string representation, with "lat,lon".
- An object representation with lat and lon explicitly named.
- An array representation with [lon,lat].

[GeoJSON](http://geojson.org/)

```js
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```

Well-Known Text representation [WKT](http://docs.opengeospatial.org/is/12-063r5/12-063r5.html)

```
CS[ellipsoidal,3],
  AXIS[“latitude”,north,ORDER[1],ANGLEUNIT["degree",0.0174532925199433]],
  AXIS[“longitude”,east,ORDER[2],ANGLEUNIT["degree",0.0174532925199433]],
  AXIS[“ellipsoidal height (h)”,up,ORDER[3],LENGTHUNIT[“metre”,1.0]]
```

## Shape

GeoJSON shapes

### Polygon

```json
{
  "type": "Feature",
  "bbox": [-10.0, -10.0, 10.0, 10.0],
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [[-10.0, -10.0], [10.0, -10.0], [10.0, 10.0], [-10.0, -10.0]]
    ]
  }
  //...
}
```

### MultiLineString

```json
{
  "type": "MultiLineString",
  "coordinates": [
    [[170.0, 45.0], [180.0, 45.0]],
    [[-180.0, 45.0], [-170.0, 45.0]]
  ]
}
```
