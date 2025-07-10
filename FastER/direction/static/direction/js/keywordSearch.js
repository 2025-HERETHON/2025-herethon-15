import { MapManager } from "./mapManager.js";
import { SearchManager } from "./searchManager.js";
import { showNearbyEmergencyHospitals } from "./emergencyHospital.js";

const imageSrc = "/static/direction/images/pin_1.svg";
const imageSize = new kakao.maps.Size(40, 40);
const imageOption = { offset: new kakao.maps.Point(20, 40) };
const markerImage = new kakao.maps.MarkerImage(
  imageSrc,
  imageSize,
  imageOption
);

const mapManager = new MapManager(
  "map",
  {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 5,
  },
  markerImage
);

const searchManager = new SearchManager("keyword", "placesList", mapManager);

showNearbyEmergencyHospitals(mapManager);
