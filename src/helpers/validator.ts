import {GeoJSON, Geometry} from 'geojson';

class InputError extends Error {
  public message = 'Unsupported GeoJSON type. Only LineString and MultiLineString Features or Geometries are allowed';
}

/**
 * Validates a GeoJSON Geometry to check for unsupported types
 *
 * @param {Geometry} geometry
 */
function validateGeoJSONGeometry(geometry: Geometry): void {
  const validGeometryTypes = ['LineString', 'MultiLineString'];

  if (!validGeometryTypes.includes(geometry.type)) {
    throw new InputError();
  }
}

/**
 * Validates the GeoJSON input to check for unsupported types
 *
 * @export
 * @param {GeoJSON} geojson
 */
export function validateGeoJSONInput(geojson: GeoJSON): void {
  switch (geojson.type) {
    case 'Feature':
      validateGeoJSONGeometry(geojson.geometry);
      break;
    case 'LineString':
    case 'MultiLineString':
      validateGeoJSONGeometry(geojson);
      break;
    default:
      throw new InputError();
  }
}
