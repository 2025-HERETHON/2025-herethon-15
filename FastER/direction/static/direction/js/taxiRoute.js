var map = new kakao.maps.Map(document.getElementById("map"), {
  center: new kakao.maps.LatLng(37.566826, 126.9786567),
  level: 5,
});

const geocoder = new kakao.maps.services.Geocoder();

const urlParams = new URLSearchParams(window.location.search);
const lat = urlParams.get("lat");
const lng = urlParams.get("lng");
const title = urlParams.get("title");

function calculateTaxiFare(distanceKm) {
  const baseFare = 3800;
  const baseDistance = 2;
  const unitDistance = 0.132;
  const unitFare = 100;

  if (distanceKm <= baseDistance) {
    return baseFare;
  } else {
    const extraDistance = distanceKm - baseDistance;
    const extraUnits = Math.ceil(extraDistance / unitDistance);
    return baseFare + extraUnits * unitFare;
  }
}

function getRoute(origin, destination) {
  fetch(`/direction/route/?origin=${origin}&destination=${destination}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.routes || data.routes.length === 0) {
        alert("경로를 찾을 수 없습니다.");
        return;
      }

      const sections = data.routes[0].sections;
      if (!sections || sections.length === 0) {
        alert("경로 정보가 부족합니다.");
        return;
      }

      const roads = sections[0].roads;
      if (!roads || roads.length === 0) {
        alert("길 정보가 없습니다.");
        return;
      }

      const summary = data.routes[0].summary;
      const duration = summary.duration;
      const distance = summary.distance;

      let path = [];

      for (let i = 0; i < roads.length; i++) {
        const road = roads[i];
        for (let j = 0; j < road.vertexes.length; j += 2) {
          const lng = road.vertexes[j];
          const lat = road.vertexes[j + 1];
          path.push(new kakao.maps.LatLng(lat, lng));
        }
      }

      const polyline = new kakao.maps.Polyline({
        path: path,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });

      polyline.setMap(map);

      if (path.length > 0) {
        map.setCenter(path[Math.floor(path.length / 2)]);
      }

      // 화면에 표시
      const minutes = Math.round(duration / 60);
      const km = (distance / 1000).toFixed(1);
      const taxiFare = calculateTaxiFare(parseFloat(km));

      if (title) {
        const destElem = document.getElementById("end-value");
        if (destElem) {
          destElem.textContent = decodeURIComponent(title);
        }
      }

      document.getElementById("taxi-info").textContent = `${minutes}`;
      document.querySelector(".taxi-km").textContent = `(${km}km)`;
      document.querySelector(
        ".price .taxi-info"
      ).textContent = `${taxiFare.toLocaleString()}원`;
      document.getElementById("info-container").style.bottom = "0px";
    });
}

// 페이지 로드 시 자동 실행
window.addEventListener("load", () => {
  if (lat && lng) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latNow = position.coords.latitude;
        const lngNow = position.coords.longitude;
        const origin = `${lngNow},${latNow}`;
        const destination = `${lng},${lat}`;
        getRoute(origin, destination);

        // 현재 위치 주소 얻기
        const coord = new kakao.maps.LatLng(latNow, lngNow);
        geocoder.coord2Address(lngNow, latNow, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const roadAddr = result[0].road_address?.address_name;
            const jibunAddr = result[0].address?.address_name;

            document.getElementById("start-value").textContent =
              roadAddr || jibunAddr || "내 위치";
          }
        });
      },
      function (error) {
        alert("현재 위치를 가져올 수 없습니다.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }
});
