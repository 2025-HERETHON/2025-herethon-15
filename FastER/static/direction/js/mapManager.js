export class MapManager {
  constructor(mapContainerId, options, markerImage) {
    this.mapContainer = document.getElementById(mapContainerId);
    this.mapOption = options;
    this.map = new kakao.maps.Map(this.mapContainer, this.mapOption);
    this.ps = new kakao.maps.services.Places();

    this.hospitalMarkers = [];
    this.searchMarkers = [];

    this.markerImage = markerImage;
    this.infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    kakao.maps.event.addListener(this.map, "click", () => {
      document.getElementById("info-container").style.bottom = "-290px";
    });
  }

  // 🔷 병원 마커 추가
  addHospitalMarker(position, hsp) {
    const marker = new kakao.maps.Marker({
      position,
      image: this.markerImage,
      title: hsp.name,
    });
    marker.setMap(this.map);

    kakao.maps.event.addListener(marker, "click", () => {
      const offsetPos = new kakao.maps.LatLng(
        position.getLat() - 0.002,
        position.getLng()
      );
      this.map.panTo(offsetPos);

      document.getElementById("hsp-title").textContent = hsp.name;
      document.getElementById("hsp-location").textContent = hsp.address;
      document.getElementById("call-num").textContent = hsp.phone;
      document.getElementById("info-value-wait").textContent =
        hsp.status?.waiting_count ?? "정보 없음";

      const loadBtn = document.querySelector(".load-btn");
      loadBtn.dataset.lat = hsp.hos_lat;
      loadBtn.dataset.lng = hsp.hos_lng;
      loadBtn.dataset.title = hsp.name;

      document.getElementById("info-container").style.bottom = "0px";
    });

    this.hospitalMarkers.push(marker);
    return marker;
  }

  // 🔷 검색 마커 추가
  addSearchMarker(position, place) {
    const marker = new kakao.maps.Marker({
      position,
      image: this.markerImage,
    });
    marker.setMap(this.map);

    kakao.maps.event.addListener(marker, "click", () => {
      document.getElementById("hsp-title").textContent = place.place_name;
      document.getElementById("hsp-location").textContent =
        place.road_address_name || place.address_name || "";
      document.getElementById("call-num").textContent =
        place.phone || "정보 없음";

      document.getElementById("info-container").style.bottom = "0px";

      var pos = marker.getPosition();
      var newLat = pos.getLat() - 0.001;
      var newLng = pos.getLng();
      this.map.panTo(new kakao.maps.LatLng(newLat, newLng));

      const loadBtn = document.querySelector(".load-btn");
      loadBtn.setAttribute("data-lat", pos.getLat());
      loadBtn.setAttribute("data-lng", pos.getLng());
      loadBtn.setAttribute("data-title", place.place_name);
    });

    this.searchMarkers.push(marker);
    return marker;
  }

  // 🔸 병원 마커 제거
  removeHospitalMarkers() {
    this.hospitalMarkers.forEach((m) => m.setMap(null));
    this.hospitalMarkers = [];
  }

  // 🔸 검색 마커 제거
  removeSearchMarkers() {
    this.searchMarkers.forEach((m) => m.setMap(null));
    this.searchMarkers = [];
  }

  // 공통
  displayInfowindow(marker, content) {
    this.infowindow.setContent(content);
    this.infowindow.open(this.map, marker);
  }

  setCenter(lat, lng) {
    this.map.setCenter(new kakao.maps.LatLng(lat, lng));
  }

  setLevel(level) {
    this.map.setLevel(level);
  }

  panTo(position) {
    this.map.panTo(position);
  }
}
