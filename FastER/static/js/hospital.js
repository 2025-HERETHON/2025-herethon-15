//메뉴 페이지 이동
document.getElementById("menu").addEventListener("click", () => {
  location.href = "/accounts/menu/";
});

//홈 이동
document.getElementById("logo").addEventListener("click", () => {
  location.href = "/accounts/home/";
});

//병원 찾기 이동
document.getElementById("recommendBtn").addEventListener("click", () => {
  location.href = "/direction/";
});

const input = document.getElementById("SymptomsInput");
const dropdown = document.getElementById("dropdown");
const options = document.querySelectorAll(".Option");
const searchBtn = document.getElementById("searchBtn");
const recommendBox = document.querySelector(".RecommendBox");

// input 클릭 시 드롭다운 보이기/숨기기
input.addEventListener("click", () => {
  dropdown.classList.toggle("visible");
  searchBtn.style.display = "none";
  recommendBox.style.display = "none";
});

//드롭다운 옵션 클릭하면 input에 값 넣기
options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((opt) => {
      opt.classList.remove("selected");
    });

    input.value = option.textContent;
    option.classList.add("selected");
    dropdown.classList.remove("visible");
    searchBtn.style.display = "block";
    searchBtn.classList.add("after");

    //직접 입력 클릭 시
    if (option.textContent === "직접 입력") {
      input.removeAttribute("readonly");
      input.focus();
    }
  });
});

//직접 입력 클릭 시
if (options.textContent === "직접 입력") {
  input.removeAttribute("readonly");
  input.focus();
}

//진료과 조회 시 결과
searchBtn.addEventListener("click", () => {
  recommendBox.style.display = "block";
});
