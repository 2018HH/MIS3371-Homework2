
// Health slider
const slider = document.getElementById("health");
const output = document.getElementById("rangedisplay");

output.innerHTML = slider.value;

slider.addEventListener("input", function () {
    output.innerHTML = this.value;
});
