document.addEventListener("DOMContentLoaded", () => {
  const typeBtn = document.querySelector(".type-btn");
  const dropDownBox = document.querySelector(".drop-down-box");

  typeBtn?.addEventListener("click", () => {
    dropDownBox.classList.toggle("active");
  });
});
