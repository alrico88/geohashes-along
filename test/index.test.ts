import {Feature, LineString, MultiLineString, Point, Position} from 'geojson';
import {getGeohashesAlong, getGeohashesAlongLineString} from '../src/index';

function lineString(coordinates: Position[]): LineString {
  return {
    type: 'LineString',
    coordinates,
  };
}

const lineStringInOne = lineString([[-5.646972656250001, 36.679433365517774], [-5.654869079589845, 36.667592771893275]]);
const lineStringInTwo = lineString([[-5.646972656250001, 36.679433365517774], [-5.595640857204868, 36.68808899697991]]);
const lineStringInFour = lineString([[-5.646972656250001, 36.679433365517774], [-5.52103918210534, 36.67588866176514]]);

describe('Test along methods for LineStrings', () => {
  test('LineStrings in same geohash should return only one for that precision', () => {
    expect(getGeohashesAlongLineString(lineStringInOne, 5)).toStrictEqual(['eyebx']);
  });

  test('Coordinates in different geohashes should return more than one geohash', () => {
    expect(getGeohashesAlongLineString(lineStringInTwo, 5)).toStrictEqual(['eyebx', 'eys08']);
  });

  test('Test a few more geohashes between', () => {
    expect(getGeohashesAlongLineString(lineStringInFour, 5)).toStrictEqual(['eyebx', 'eys08', 'eys09', 'eys0d']);
  });
});

describe('Test along methods for MultiLineStrings', () => {
  test('The geohashes in a MultiLineString should be equal to the geohashes in each LineString that forms it', () => {
    const line1 = [
      [
        -5.883596,
        41.820455,
      ],
      [
        -4.389886,
        42.183759,
      ],
      [
        -3.489267,
        41.570252,
      ],
      [
        -4.966502,
        40.734771,
      ],
    ];

    const line2 = [
      [
        -6.114243,
        40.225024,
      ],
      [
        -3.621065,
        39.478606,
      ],
      [
        -3.143297,
        40.446947,
      ],
      [
        -4.302021,
        40.513799,
      ],
    ];

    const multiLineString: MultiLineString = {
      type: 'MultiLineString',
      coordinates: [line1, line2],
    };

    const hashesInLine1 = getGeohashesAlong(lineString(line1), 5);
    const hashesInLine2 = getGeohashesAlong(lineString(line2), 5);

    expect(getGeohashesAlong(multiLineString, 5).sort()).toStrictEqual([...new Set([...hashesInLine1, ...hashesInLine2])].sort());
  });
});

describe('Test error throwing', () => {
  test('GeoJSON Geometries other than LineStrings or MultiLineStrings should throw', () => {
    expect(() => {
      const point: Point = {
        type: 'Point',
        coordinates: [1, 2],
      };

      getGeohashesAlong(point as any, 5);
    }).toThrow();
  });

  test('GeoJSON Features other than LineStrings or MultiLineStrings should throw', () => {
    expect(() => {
      const point: Feature<Point> = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1, 2],
        },
        properties: {},
      };

      getGeohashesAlong(point as any, 5);
    }).toThrow();
  });
});
