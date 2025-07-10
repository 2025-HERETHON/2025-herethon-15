import { getDistance } from "./utils.js";

let lastCenter = null;
const MIN_DISTANCE_KM = 0.3;
const MAX_RANGE = 5;

export function showNearbyEmergencyHospitals(mapManager) {
  if (!navigator.geolocation) {
    alert("위치 정보를 지원하지 않는 브라우저입니다.");
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    const userLoc = new kakao.maps.LatLng(userLat, userLng);
    mapManager.setCenter(userLat, userLng);

    // 내 위치 마커
    new kakao.maps.Marker({
      map: mapManager.map,
      position: userLoc,
      title: "내 위치",
    });

    // 최초 병원 로딩 (반경 5km, bounds 조정)
    fetchAndRenderHospitals(userLat, userLng, mapManager, {
      initialLoad: true,
      setBounds: true,
    });
    lastCenter = { lat: userLat, lng: userLng };

    // 지도 이동 후 병원 자동 갱신 (bounds 조정 없이)
    kakao.maps.event.addListener(mapManager.map, "idle", () => {
      const center = mapManager.map.getCenter();
      const curLat = center.getLat();
      const curLng = center.getLng();

      if (
        !lastCenter ||
        getDistance(lastCenter.lat, lastCenter.lng, curLat, curLng) >=
          MIN_DISTANCE_KM
      ) {
        fetchAndRenderHospitals(curLat, curLng, mapManager, {
          initialLoad: false,
          setBounds: false,
        });
        lastCenter = { lat: curLat, lng: curLng };
      }
    });
  });
}

function fetchAndRenderHospitals(
  lat,
  lng,
  mapManager,
  options = { initialLoad: false, setBounds: false }
) {
  const emrActive = document
    .getElementById("emr-btn")
    ?.classList.contains("active");
  const nightActive = document
    .getElementById("night-btn")
    ?.classList.contains("active");

  fetch("/direction/api/hospitals/")
    .then((res) => res.json())
    .then((data) => {
      let nearbyHospitals = [];

      if (options.initialLoad) {
        // 초기 로딩: 사용자 위치 기준 반경 5km 내 응급실 병원 모두

        nearbyHospitals = data.hospitals.filter((hsp) => {
          const dist = getDistance(lat, lng, hsp.hos_lat, hsp.hos_lng);
          const withinRange = options.initialLoad ? dist <= MAX_RANGE : true;

          if (!withinRange) return false;

          if (
            document.getElementById("emr-btn") &&
            !emrActive &&
            hsp.is_emergency
          ) {
            // 응급실 버튼이 비활성화인데 병원이 응급실인 경우 제외
            return false;
          }
          if (
            document.getElementById("night-btn") &&
            !nightActive &&
            hsp.night
          ) {
            // 야간 버튼 비활성화인데 병원이 야간 운영이면 제외
            return false;
          }

          if (!options.initialLoad) {
            const pos = new kakao.maps.LatLng(hsp.hos_lat, hsp.hos_lng);
            if (!mapManager.map.getBounds().contain(pos)) return false;
          }

          return true;
        });
      } else {
        // 이후 지도 이동: 현재 지도 영역 내 응급실 병원만 필터링
        const bounds = mapManager.map.getBounds();
        nearbyHospitals = data.hospitals.filter((hsp) => {
          if (!hsp.is_emergency) return false;
          const pos = new kakao.maps.LatLng(hsp.hos_lat, hsp.hos_lng);
          return bounds.contain(pos);
        });
      }

      // 기존 마커 모두 제거
      mapManager.removeHospitalMarkers();

      if (nearbyHospitals.length === 0) return;

      // 마커를 찍기 위한 LatLngBounds 객체 생성
      const bounds = new kakao.maps.LatLngBounds();

      // 초기 로딩이면 사용자 위치도 bounds에 포함시킴
      if (options.initialLoad) {
        bounds.extend(new kakao.maps.LatLng(lat, lng));
      }

      nearbyHospitals.forEach((hsp) => {
        const position = new kakao.maps.LatLng(hsp.hos_lat, hsp.hos_lng);
        bounds.extend(position);

        const marker = new kakao.maps.Marker({
          map: mapManager.map,
          position,
          image: mapManager.markerImage,
          title: hsp.name,
        });

        kakao.maps.event.addListener(marker, "click", () => {
          const offsetPos = new kakao.maps.LatLng(
            position.getLat() - 0.005,
            position.getLng()
          );
          mapManager.map.panTo(offsetPos);

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

        mapManager.hospitalMarkers.push(marker);
      });

      // 초기 로딩일 때만 지도 bounds 자동 맞춤
      if (options.setBounds) {
        mapManager.map.setBounds(bounds);
      }
    });
}
