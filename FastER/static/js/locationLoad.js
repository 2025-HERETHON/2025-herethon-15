document.addEventListener("DOMContentLoaded", () => {
  const loadBtn = document.querySelector(".load-btn");
  if (loadBtn) {
    loadBtn.addEventListener("click", function () {
      const lat = this.dataset.lat;
      const lng = this.dataset.lng;
      const title = this.dataset.title;

      const url = `${
        window.location.origin
      }/direction/taxi?lat=${lat}&lng=${lng}&title=${encodeURIComponent(
        title
      )}`;
      window.location.href = url;
    });
  } else {
    console.error(".load-btn 요소를 찾을 수 없습니다.");
  }
});
