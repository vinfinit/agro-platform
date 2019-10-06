const round = (n, precision=2) => {
  const factor = Math.pow(10, precision);
  return Math.round(n * factor) / factor
}

// compute area in m
const getArea = (polygon) => {
  const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
  return area
}

const getCenter = (polygon) => {
  let bounds = new google.maps.LatLngBounds();
  polygon.getPath().forEach(path => {
    bounds.extend(path)
  });
  return bounds.getCenter()
}

module.exports = {
  round,
  getArea,
  getCenter,
}