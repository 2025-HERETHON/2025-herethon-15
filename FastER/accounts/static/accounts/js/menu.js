//로그인 페이지 이동
document.getElementById("logoutVer").addEventListener("click", () => {
  location.href = "login.html";
});

//메뉴창 열릴 때 직전 페이지 저장
sessionStorage.setItem("prePage", document.referrer || "main.html");

// X 버튼 클릭 이벤트 처리
document.getElementById("close").addEventListener("click", () => {
  const justLoggedIn = sessionStorage.getItem("justLoggedIn");
  const prePage = sessionStorage.getItem("prePage") || "main.html";

  if (justLoggedIn === "true") {
    sessionStorage.removeItem("justLoggedIn");
    location.href = "home.html"; // 로그인 직후면 메인 화면으로
  } else {
    location.href = prePage; // 아니면 이전 화면으로
  }
});

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn === "true") {
  // 로그인 후 메뉴 보여주기
  document.getElementById("loginVer").style.display = "block";
  document.getElementById("logoutVer").style.display = "none";
} else {
  // 로그인 전 메뉴 보여주기
  document.getElementById("loginVer").style.display = "none";
  document.getElementById("logoutVer").style.display = "block";
}

//증상 입력 후 병원 찾기 이동
document.getElementById("btn2").addEventListener("click", () => {
  location.href = "hospital.html";
});

//로그아웃 테스트용 임시 코드
//localStorage.removeItem("isLoggedIn");
