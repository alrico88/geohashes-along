import {coordAll} from '@turf/meta';
import {getGeohashesBetweenCoordinates} from 'geohashes-between';
import {Feature, LineString, MultiLineString, Position} from 'geojson';
import {getLineStringsFromMultiLineString} from './helpers/simplify';
import {validateGeoJSONInput} from './helpers/validator';

/**
 * Get a list of geohashes along a LineString Geometry
 *
 * @export
 * @param {LineString} lineString The LineString Geometry
 * @param {number} precision The precision for the geohash list
 * @return {string[]} The geohashes along the LineString
 */
export function getGeohashesAlongLineString(lineString: LineString, precision: number): string[] {
  const coords: Position[] = coordAll(lineString);

  const uniqueGeohashes = coords.reduce((agg, coord, index) => {
    const nextCoord = coords[index + 1];

    if (nextCoord === undefined) {
      return agg;
    }

    const geohashesBetween = getGeohashesBetweenCoordinates(coord, nextCoord, precision);

    geohashesBetween.forEach((geohash) => {
      agg.add(geohash);
    });

    return agg;
  }, new Set());

  return Array.from(uniqueGeohashes as Set<string>);
}

/**
 * Get a list of geohashes along a MultiLineString Geometry
 *
 * @export
 * @param {MultiLineString} multiLineString The MultiLineString Geometry
 * @param {number} precision The precision for the geohash list
 * @return {string[]} The geohashes along the MultiLineString
 */
export function getGeohashesAlongMultiLineString(multiLineString: MultiLineString, precision: number): string[] {
  const asLineStringsArray = getLineStringsFromMultiLineString(multiLineString);

  const geohashes = asLineStringsArray.map((lineString) => getGeohashesAlongLineString(lineString, precision)).flat(1);

  return [...new Set(geohashes)];
}

/**
 * Get a list of geohashes along a LineString or MultiLineString GeoJSON Feature or Geometry
 *
 * @export
 * @param {(Feature<LineString | MultiLineString> | LineString | MultiLineString)} feature The GeoJSON Feature or Geometry
 * @param {number} precision The precision for the geohash list
 * @return {string[]} The list of geohashes along the line
 */
export function getGeohashesAlong(feature: Feature<LineString | MultiLineString> | LineString | MultiLineString, precision: number): string[] {
  validateGeoJSONInput(feature);

  if (feature.type === 'Feature') {
    return getGeohashesAlong(feature.geometry, precision);
  } else if (feature.type === 'LineString') {
    return getGeohashesAlongLineString(feature, precision);
  } else {
    return getGeohashesAlongMultiLineString(feature, precision);
  }
}
