import { MapManager } from "./mapManager.js";
import { SearchManager } from "./searchManager.js";
import { showNearbyEmergencyHospitals } from "./emergencyHospital.js";

const emrImageSrc = "/static/images/pin_emr.svg";
const basicImageSrc = "/static/images/pin_hos.svg";
const hereImageSrc = "/static/images/pin_here.svg";
const imageSize = new kakao.maps.Size(40, 40);
const imageOption = { offset: new kakao.maps.Point(20, 40) };
const markerImage = new kakao.maps.MarkerImage(
  emrImageSrc,
  imageSize,
  imageOption
);
const basicmarkerImage = new kakao.maps.MarkerImage(
  basicImageSrc,
  imageSize,
  imageOption
);
const heremarkerImage = new kakao.maps.MarkerImage(
  hereImageSrc,
  imageSize,
  imageOption
);
export const mapManager = new MapManager(
  "map",
  {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 5,
  },
  markerImage
);

mapManager.basicmarkerImage = basicmarkerImage;
mapManager.heremarkerImage = heremarkerImage;

const searchManager = new SearchManager("keyword", "placesList", mapManager);

showNearbyEmergencyHospitals(mapManager);
