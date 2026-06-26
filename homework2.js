
// Health slider
document.addEventListener("DOMContentLoaded, function() {
    const slider = document.getElementById("health");
    const rangeDisplay = document.getElementById("rangedisplay");

    slider.addEventListener("input", function() {
        rangeDisplay.textContent = slider.value;
    });
});
