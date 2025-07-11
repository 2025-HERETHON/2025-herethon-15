import { showNearbyEmergencyHospitals } from "./emergencyHospital.js";
import { mapManager } from "./keywordSearch.js";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      button.classList.toggle("active");

      const center = mapManager.map.getCenter();
      showNearbyEmergencyHospitals(mapManager, {
        lat: center.getLat(),
        lng: center.getLng(),
        reload: true,
        setBounds: false,
      });
    });
  });
});
