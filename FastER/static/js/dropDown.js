document.addEventListener("DOMContentLoaded", () => {
  const typeBtn = document.querySelector(".type-btn");
  const dropDownBox = document.querySelector(".drop-down-box");

  typeBtn?.addEventListener("click", () => {
    dropDownBox.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const starBtn = document.querySelector(".star-btn");

  starBtn?.addEventListener("click", () => {
    const isActive = starBtn.classList.toggle("active");

    if (isActive) {
      starBtn.innerHTML = `
        <path d="M11.7109 1.20703L14.8009 7.46703L21.7109 8.47703L16.7109 13.347L17.8909 20.227L11.7109 16.977L5.53094 20.227L6.71094 13.347L1.71094 8.47703L8.62094 7.46703L11.7109 1.20703Z" fill="#FF9901" stroke="#FF9901" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      starBtn.innerHTML = `
        <path d="M11.334 1.79492L14.424 8.05492L21.334 9.06492L16.334 13.9349L17.514 20.8149L11.334 17.5649L5.15398 20.8149L6.33398 13.9349L1.33398 9.06492L8.24398 8.05492L11.334 1.79492Z" stroke="#D5D5D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hosBtn = document.getElementById("hos-filter-btn");
  const topImage = document.getElementById("top-image");

  hosBtn?.addEventListener("click", () => {
    hosBtn.classList.toggle("active");
    topImage.classList.toggle("show");
  });
});
