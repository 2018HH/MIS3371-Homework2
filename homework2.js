
// Health slider
document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("health");
    const rangeDisplay = document.getElementById("rangedisplay");

    rangeDisplay.textContent = slider.value;

    slider.addEventListener("input", function() {
        rangeDisplay.textContent = slider.value;
    });
});

//Review Button
const form = document.querySelector("form");
const reviewButton = document.getElementById("reviewbutton");
const reviewArea = document.getElementById("review");

reviewButton.addEventListener("click", function(event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
    const userId = document.getElementById("userid").value;
    let passwordError = "";

    if(password !== confirmPassword) {
        passwordError = "ERROR: Passwords do not match!";
    }
    else if(password.includes(userId) && userId !== "") {
        passwordError = "ERROR: Password cannot contain your User ID!"
    }

//Fetch current values for user to review
let reviewHTML = '
    <h3>PLEASE REVIEW INPUTTED INFORMATION BEFORE SUBMITTING</h3>
    <table border="1" style="width:100%;
        <tr>
            <td><strong>Name:</strong></td>
            <td>${document.getElementById("firstname").value} ${document.getElementById("middleinit").value}. ${document.getElementById("lastname").value}</td>
            <td><span stlye="color: green;"Pass</span></td>
        </tr>
        <tr>
            <td><strong>Password Check:</strong></td>
            <td>********</td>
            <td><span style="color: red;">${passwordError ? passwordError : 'Pass'}</span></td>
        </tr>
        <tr>
            <td><strong>Zip Code Check:</strong></td>
            <td>${document.getElementById("zip").value}</td>
            <td>${document.getElementById("zip").value.length === 5 ? 'Pass' : 'Truncated/Fixed'}</td>
    </tr>
    </table>
';
reviewArea.innerHTML = reviewHTML;
});
