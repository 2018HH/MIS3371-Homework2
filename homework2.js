/* 
 Name: Hailey Haiducek
 File: homework2.js
 Date Created: 6/24/2026
 Date Updated: 6/26/2026
 Purpose: External JavaScript file - Homework 2
*/

/* https://profjake.w3spaces.com/MIS3371/homework1.html and https://www.w3schools.com/css/default.asp was used as a template. I used ChatGpt to debug and clean up function usage, particularly with the Review Button*/
document.addEventListener("DOMContentLoaded", function () {
    
    // Health Slider
    const slider = document.getElementById("health");
    const display = document.getElementById("rangedisplay");

    slider.addEventListener("input", function () {
        display.textContent = this.value;
    });

    // Validation functions
    window.validateDOB = function () {
        const dob = document.getElementById("dob").value;
        const error = document.getElementById("dob_text");

        const today = new Date();
        const date = new Date(dob);

        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 120);

        if (!dob) {
            error.textContent = "DOB required";
            return;
        }

        if (date > today) {
            error.textContent = "Cannot be in future";
            return;
        }

        if (date < minDate) {
            error.textContent = "Too far in past (120yr limit)";
            return;
        }
    };

    function validatePhone() {
        const phone = document.getElementById("phone").value;
        const error = document.getElementById("phone_text");

        if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
            error.textContent = "Invalid phone format";
            return;
        }
    };

    function validateEmail() {
        const email = document.getElementById("email").value;
        const error = document.getElementById("email_text");

        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)) {
            error.textContent = "Invalid email";
            return;
        }

    };

    function checkPasswords () {
        const pw = document.getElementById("password").value;
        const cpw = document.getElementById("confirmpassword").value;
        const user = document.getElementById("userid").value;
        const error = document.getElementById("password_error");

        if (pw !== cpw) {
            error.textContent = "Passwords do not match";
            return false;
        }

        if (pw.includes(user) && user !== "") {
            error.textContent = "Password cannot contain User ID";
            return false;
        }
    };
    
//Review Button - array format sourced from https://www.w3schools.com/js/js_arrays.asp
document.getElementById("reviewBtn").addEventListener("click", function () {
    let prefs = []
    if (document.getElementById("prefemail").checked) prefs.push("Email");
    if (document.getElementById("smstext").checked) prefs.push("SMS");
    if (document.getElementById("phonecall").checked) prefs.push("Phone");
    if (document.getElementById("voicemail").checked) prefs.push("Voicemail");
    if (document.getElementById("direct").checked) prefs.push("Direct");

        let zipDisplay = document.getElementById("zip").value.substring(0,5);

        let reviewHTML = `
        <h2>PLEASE REVIEW INFORMATION</h2>

        <table border="1" style="width:100%; border-collapse: collapse;">

        <tr>
            <td><b>Name</b></td>
            <td>
                ${firstname.value} ${middleinit.value} ${lastname.value}
            </td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>DOB</b></td>
            <td>${dob.value}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>${email.value}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>${phone.value}</td>
        </tr>

        <tr>
            <td><b>State</b></td>
            <td>${state.value}</td>
        </tr>

        <tr>
            <td><b>Zip</b></td>
            <td>${zipDisplay}</td>
        </tr>

        <tr>
            <td><b>Health</b></td>
            <td>${health.value}</td>
        </tr>

        <tr>
            <td><b>Preferences</b></td>
            <td>${prefs.join(", ")}</td>
        </tr>

        <tr>
            <td><b>Password</b></td>
            <td>******</td>
        </tr>

        </table>
        `;

        document.getElementById("review").innerHTML = reviewHTML;
    });

});
//End of JavaScript - Homework 2
