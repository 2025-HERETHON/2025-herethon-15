// 지도 기본 설정
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

var imageSrc = "/static/direction/images/pin_1.svg"; // 이미지 경로
var imageSize = new kakao.maps.Size(40, 40); // 마커 이미지 크기
var imageOption = { offset: new kakao.maps.Point(20, 40) }; // 중심 좌표

var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

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
      removeMarkers();
      var position = new kakao.maps.LatLng(place.y, place.x);
      var marker = addMarker(position, place);
      markers.push(marker);

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
  markers.push(marker);

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
