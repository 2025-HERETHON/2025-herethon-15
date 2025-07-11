export class SearchManager {
  constructor(inputId, listId, mapManager) {
    this.input = document.getElementById(inputId);
    this.list = document.getElementById(listId);
    this.mapManager = mapManager;
    this.currentSearchResults = [];

    this.input.addEventListener("input", this.onInput.bind(this));
    this.input.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onInput() {
    const keyword = this.input.value.trim();
    this.list.style.display = "block";
    if (!keyword) {
      this.clearList();
      return;
    }

    this.mapManager.ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        this.currentSearchResults = data;
        this.updateList(data);
      } else {
        this.clearList();
      }
    });
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      if (this.currentSearchResults.length === 0) {
        alert("검색 결과가 없습니다.");
        return;
      }
      this.list.style.display = "none";

      this.mapManager.removeSearchMarkers();

      const bounds = new kakao.maps.LatLngBounds();

      this.currentSearchResults.forEach((place) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        this.mapManager.addSearchMarker(position, place);
        bounds.extend(position);
      });

      this.mapManager.map.setBounds(bounds);

      this.clearList();
    }
  }

  updateList(places) {
    this.list.innerHTML = "";
    places.forEach((place) => {
      const itemEl = document.createElement("li");
      itemEl.textContent = place.place_name;
      itemEl.style.cursor = "pointer";
      itemEl.addEventListener("click", () => {
        this.mapManager.removeSearchMarkers();

        const position = new kakao.maps.LatLng(place.y, place.x);
        this.mapManager.setLevel(3);
        this.mapManager.panTo(position);

        setTimeout(() => {
          const marker = this.mapManager.addSearchMarker(position, place);
          this.clearList();
        }, 300);

        // const marker = this.mapManager.addSearchMarker(position, place);
        // //this.mapManager.displayInfowindow(marker, place.place_name);
        // this.clearList();
      });
      this.list.appendChild(itemEl);
    });
  }

  clearList() {
    this.list.innerHTML = "";
    this.currentSearchResults = [];
  }
}
