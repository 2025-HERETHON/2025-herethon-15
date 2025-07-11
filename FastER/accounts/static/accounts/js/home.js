//응급실 바로 찾기 이동
document.getElementById("btn1").addEventListener("click", () => {
  location.href = "/direction/map_emr/";
});

//증상 입력 후 병원 찾기 페이지 이동
document.getElementById("btn2").addEventListener("click", () => {
  location.href = "/accounts/hospital/";
});

//지도에서 찾아보기 이동
document.getElementById("searchText1").addEventListener("click", () => {
  location.href = "/direction/map/";
});

//병원 리스트 보기 이동
document.getElementById("searchText2").addEventListener("click", () => {
  location.href = "/hospital/list/";
});

//메뉴 페이지 이동
document.getElementById("menu").addEventListener("click", () => {
  location.href = "/accounts/menu/";
});
