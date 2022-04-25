import { round as turfRound } from '@turf/turf'

const round = (n, precision=2) => turfRound(n || 0, precision);

// compute area in m^2
const computeArea = (polygon) =>
  google.maps.geometry.spherical.computeArea(polygon.getPath());

// compute length between pointA and pointB in m
const computeLength = (pointA, pointB) => 
  google.maps.geometry.spherical.computeLength([pointA, pointB]);

const getCenter = (polygon) => {
  let bounds = new google.maps.LatLngBounds();
  polygon.getPath().getArray().forEach(path => {
    bounds.extend(path)
  });
  return bounds.getCenter()
}

const getBounds = (polygon) => {
  return polygon.getPath().getArray().map(p => ({
    lat: p.lat(),
    lng: p.lng(),
  }))
}

const arcTangent = (k) => {
  return Math.atan(k) * 180 / Math.PI
}

const tangent = (degrees) => {
  return Math.tan(degrees * Math.PI/180)
}

const cos = (degrees) => {
  return Math.cos(degrees * Math.PI/180)
}

const Point = (x, y) => new google.maps.LatLng(x, y);

const Size = (width, height) => new google.maps.Size(width, height);

const isSamePoints = (A, B) => A.lat() === B.lat() && A.lng() === B.lng();

module.exports = {
  round,
  computeArea,
  computeLength,
  getCenter,
  getBounds,
  arcTangent,
  tangent,
  cos,
  Point,
  isSamePoints,
  Size,
}