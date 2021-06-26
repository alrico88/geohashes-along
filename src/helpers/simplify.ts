import {MultiLineString, LineString} from 'geojson';

/**
 * Converts a MultiLineString into an array of LineStrings
 *
 * @export
 * @param {MultiLineString} multiLineString The MultiLineString to split
 * @return {LineString[]} The list of LineStrings
 */
export function getLineStringsFromMultiLineString(multiLineString: MultiLineString): LineString[] {
  return multiLineString.coordinates.map((coords) => ({
      type: 'LineString',
      coordinates: coords,
    }));
}
