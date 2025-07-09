var mapContainer = document.getElementById("map"),
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 5,
  };

var map = new kakao.maps.Map(mapContainer, mapOption);
var ps = new kakao.maps.services.Places();
var markers = [];
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

var currentSearchResults = []; // 현재 리스트에 보이는 검색 결과 저장

var imageSrc = "/static/images/pin_1.svg"; // 이미지 경로
var imageSize = new kakao.maps.Size(40, 40); // 마커 이미지 크기
var imageOption = { offset: new kakao.maps.Point(20, 40) }; // 중심 좌표

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

//showNearbyEmergencyHospitals(map)

// 리스트 업데이트 (입력시 자동)
document.getElementById("keyword").addEventListener("input", function () {
  var keyword = this.value.trim();
  document.getElementById("placesList").style.display = "block";
  if (!keyword) {
    clearList();
    return;
  }

  ps.keywordSearch(keyword, function (data, status) {
    if (status === kakao.maps.services.Status.OK) {
      currentSearchResults = data; // 최신 결과 저장
      updateList(data);
    } else {
      clearList();
    }
  });
});

// 엔터 눌렀을 때 마커 생성 및 지도 이동
document.getElementById("keyword").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (currentSearchResults.length === 0) {
      alert("검색 결과가 없습니다.");
      return;
    }
    document.getElementById("placesList").style.display = "none";

    // 마커 초기화
    removeMarkers();

    // 모든 마커 생성
    var bounds = new kakao.maps.LatLngBounds();

    currentSearchResults.forEach(function (place) {
      var position = new kakao.maps.LatLng(place.y, place.x);
      var marker = addMarker(position, place);
      markers.push(marker);
      bounds.extend(position);
    });

    map.setBounds(bounds);

    clearList();
  }
});

// 리스트 업데이트 함수 (자동 갱신)
function updateList(places) {
  var listEl = document.getElementById("placesList");
  listEl.innerHTML = "";

  places.forEach(function (place, index) {
    var itemEl = document.createElement("li");
    itemEl.textContent = place.place_name;
    itemEl.style.userSelect = "none";
    itemEl.style.padding = "8px 12px";
    itemEl.style.cursor = "pointer";
    itemEl.style.borderBottom = "1px solid #eee";

    // 클릭하면 리스트 숨기고 지도 이동 + 확대 + 인포윈도우
    itemEl.addEventListener("click", function () {
      var position = new kakao.maps.LatLng(place.y - 0.001, place.x);

      // 지도 이동 및 확대
      map.panTo(position);
      map.setLevel(3);

      // 인포윈도우 열기
      displayInfowindow(addMarker(position, place), place.place_name);

      //리스트 비우기
      clearList();
    });

    listEl.appendChild(itemEl);
  });
}

// 리스트 비우기
function clearList() {
  var listEl = document.getElementById("placesList");
  listEl.innerHTML = "";
  currentSearchResults = [];
}

function addMarker(position, place) {
  var marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });

  marker.setMap(map);

  //마커 클릭 시 이벤트
  kakao.maps.event.addListener(marker, "click", function () {
    removeMarkersExcept(marker);

    document.getElementById("hsp-title").textContent = place.place_name;
    document.getElementById("hsp-location").textContent =
      place.road_address_name || place.address_name || "";
    document.getElementById("call-num").textContent =
      place.phone || "정보 없음";

    document.getElementById("info-container").style.bottom = "0px";
    map.setLevel(3);

    var pos = marker.getPosition();
    var newLat = pos.getLat() - 0.001;
    var newLng = pos.getLng();
    map.panTo(new kakao.maps.LatLng(newLat, newLng));

    const loadBtn = document.querySelector(".load-btn");
    loadBtn.setAttribute("data-lat", pos.getLat());
    loadBtn.setAttribute("data-lng", pos.getLng());
    loadBtn.setAttribute("data-title", place.place_name);
  });

  return marker;
}

// 마커 제거 함수
function removeMarkers() {
  markers.forEach(function (marker) {
    marker.setMap(null);
  });
  markers = [];
  infowindow.close();
}

// 해당 마커 제외 제거 함수
function removeMarkersExcept(selectedMarker) {
  markers.forEach(function (marker) {
    if (marker !== selectedMarker) {
      marker.setMap(null); // 숨김
    }
  });
  // 선택한 마커는 보여짐 상태 유지
  selectedMarker.setMap(map);

  infowindow.close();
}

// 인포윈도우 표시 함수
function displayInfowindow(marker, title) {
  infowindow.setContent('<div style="padding:5px;">' + title + "</div>");
  infowindow.open(map, marker);
}

// 지도 클릭 시 숨긴 마커 다시 보이기
kakao.maps.event.addListener(map, "click", function () {
  document.getElementById("info-container").style.bottom = "-290px";

  // 모든 마커 다시 보이게 설정
  markers.forEach(function (marker) {
    marker.setMap(map);
  });
});

// 1. 거리 계산 함수 (Haversine)
// function getDistance(lat1, lng1, lat2, lng2) {
//   const R = 6371; // km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLng = (lng2 - lng1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// // 2. 현재 위치 기반 응급실 마커 표시
// function showNearbyEmergencyHospitals(map) {
//   if (!navigator.geolocation) {
//     alert("위치 정보를 지원하지 않는 브라우저입니다.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(function (position) {
//     const lat = position.coords.latitude;
//     const lng = position.coords.longitude;

//     // 지도 중심 설정
//     const userLoc = new kakao.maps.LatLng(lat, lng);
//     map.setCenter(userLoc);

//     // 사용자 위치 마커
//     new kakao.maps.Marker({
//       map,
//       position: userLoc,
//       title: "내 위치",
//     });
//     console.log("병원 데이터 요청 URL:", "/api/hospitals/");
//     // 3. 병원 데이터 불러오기
//     fetch("/hospital/api/hospitals/")
//       .then((res) => res.json())
//       .then((data) => {
//         data.hospitals.forEach((hsp) => {
//           // 4. 응급실 + 거리 5km 이하
//           const dist = getDistance(lat, lng, hsp.hos_lat, hsp.hos_lng);
//           if (hsp.is_emergency && dist <= 5) {
//             const marker = new kakao.maps.Marker({
//               map,
//               position: new kakao.maps.LatLng(hsp.hos_lat, hsp.hos_lng),
//               title: hsp.name,
//               image: markerImage,
//             });

//             // 5. 마커 클릭 시 상세 정보 표시
//             kakao.maps.event.addListener(marker, "click", function () {
//               document.getElementById("hsp-title").textContent = hsp.name;
//               document.getElementById("hsp-location").textContent = hsp.address;
//               document.getElementById("call-num").textContent = hsp.phone;
//               document.querySelector(".load-btn").dataset.lat = hsp.hos_lat;
//               document.querySelector(".load-btn").dataset.lng = hsp.hos_lng;
//               document.querySelector(".load-btn").dataset.title = hsp.name;
//               document.getElementById("info-container").style.bottom = "0px";
//             });
//           }
//         });
//       });
//   });
// }
