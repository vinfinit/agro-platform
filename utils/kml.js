import convert from 'xml-js'

const extractCoordinatesFromPolygon = (polygon) =>
  polygon.outerBoundaryIs.LinearRing.coordinates._text
    .split(/[\s,]+/)
    .filter(i => i !== '')
    .map(parseFloat)
    .filter((item, index) => (index+1) % 3 !== 0)
    .reduce((acc, item, index) => {
      if (index % 2 === 0) {
        acc.push({ lng: item });
      } else {
        acc[parseInt(index/2)].lat = item
      }
      return acc
    }, []);

const parseKml = (kml) => {
  const parsedKml = convert.xml2js(kml, {compact: true});
  const Placemark = parsedKml.kml.Document.Placemark || parsedKml.kml.Document.Folder.Placemark;

  const parsedJson = Placemark.map(
    (placemark, index) => {
      if (placemark.MultiGeometry) {
        return placemark.MultiGeometry.Polygon.map(extractCoordinatesFromPolygon)[0]
      }
      return extractCoordinatesFromPolygon(placemark.Polygon)
  });

  return parsedJson;
};

export default parseKml