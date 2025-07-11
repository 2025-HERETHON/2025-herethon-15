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

// 옵션 클릭 시 input에 값 입력 + 처리
options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((opt) => opt.classList.remove("selected"));

    const value = option.textContent.trim();
    input.value = value;
    option.classList.add("selected");
    dropdown.classList.remove("visible");
    searchBtn.style.display = "block";
    searchBtn.classList.add("after");

    if (value === "직접 입력") {
      input.removeAttribute("readonly");
      input.focus();
    }
  });
});

// 조회 버튼 누르면 결과 박스 보여주고 form 제출
searchBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    alert("증상을 입력해 주세요!");
    return;
  }
  // 실제 추천 박스 보이기
  recommendBox.style.display = "block";
});
