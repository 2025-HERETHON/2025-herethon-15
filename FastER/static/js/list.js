//메뉴 페이지 이동
document.getElementById("menu").addEventListener("click", () => {
  location.href = "/accounts/menu/";
});

//홈 이동
document.getElementById("logo").addEventListener("click", () => {
  location.href = "/accounts/home/";
});

const toggleBtn = document.getElementById("toggleDown");
const optionBox = document.getElementById("optionBox");
const options = document.querySelectorAll(".Option");
const input = document.getElementById("optionInput");
const btn1 = document.getElementById("CS2"); //최근
const btn2 = document.getElementById("HP8"); //자주
const btn3 = document.getElementById("PM9"); //즐겨찾기
const title1 = document.querySelector(".Title"); //최근
const title2 = document.querySelector(".Title-1"); //자주
const title3 = document.querySelector(".Title-2"); //즐겨찾기
const downIcon = "../images/toggleDown.svg";
const upIcon = "../images/toggleUp.svg";
const hospitalBox1 = document.querySelectorAll(".HospitalBox")[0];
const hospitalBox2 = document.querySelectorAll(".HospitalBox")[1];

// toggleBtn 클릭 시 드롭다운 보이기/숨기기, 아이콘 변경
toggleBtn.addEventListener("click", () => {
  const isVisible = optionBox.classList.toggle("visible");
  toggleBtn.src = isVisible ? upIcon : downIcon;
});

//드롭다운 옵션 클릭하면 input에 값 넣기
options.forEach((option) => {
  option.addEventListener("click", () => {
    input.value = option.textContent;
    optionBox.classList.remove("visible");
    toggleBtn.src = downIcon;
  });
});

//버튼 스타일 초기화 함수
function resetButtons() {
  btn1.classList.add("active1");
  btn2.classList.remove("active");
  btn3.classList.remove("active");
}

//타이틀 모두 숨기기 함수
function hideAllTitles() {
  title1.style.display = "none";
  title2.style.display = "none";
  title3.style.display = "none";
}

//최근 방문한 병원
btn1.addEventListener("click", () => {
  resetButtons();
  btn1.classList.remove("active1");

  hideAllTitles();
  title1.style.display = "block";

  hospitalBox1.style.display = "block";
  hospitalBox2.style.display = "block";
});

//자주 방문한 병원
btn2.addEventListener("click", () => {
  resetButtons();
  btn2.classList.add("active");

  hideAllTitles();
  title2.style.display = "block";

  hospitalBox1.style.display = "block";
  hospitalBox2.style.display = "block";
});

//즐겨찾기한 병원
btn3.addEventListener("click", () => {
  resetButtons();
  btn3.classList.add("active");

  hideAllTitles();
  title3.style.display = "block";

  hospitalBox1.style.display = "block";
  hospitalBox2.style.display = "none";
});
