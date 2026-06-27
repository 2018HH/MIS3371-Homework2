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
            return false;
        }

        if (date > today) {
            error.textContent = "Cannot be in future";
            return false;
        }

        if (date < minDate) {
            error.textContent = "Too far in past (120yr limit)";
            return false;
        }

        error.textContent = "";
        return true;
    };

    window.validatePhone = function () {
        const phone = document.getElementById("phone").value;
        const error = document.getElementById("phone_text");

        const pattern = /^\d{3}-\d{3}-\d{4}$/;

        if (!pattern.test(phone)) {
            error.textContent = "Invalid phone format";
            return false;
        }

        error.textContent = "";
        return true;
    };

    window.validateEmail = function () {
        const email = document.getElementById("email").value;
        const error = document.getElementById("email_text");

        const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

        if (!pattern.test(email)) {
            error.textContent = "Invalid email";
            return false;
        }

        error.textContent = "";
        return true;
    };

    window.checkPasswords = function () {
        const pw = document.getElementById("password").value;
        const cpw = document.getElementById("confirmpassword").value;
        const user = document.getElementById("userid").value;
        const error = document.getElementById("password_error");

        const special = /[!@#$%^&*()_\-+=]/;

        if (pw !== cpw) {
            error.textContent = "Passwords do not match";
            return false;
        }

        if (pw.includes(user) && user !== "") {
            error.textContent = "Password cannot contain User ID";
            return false;
        }

        if (!special.test(pw)) {
            error.textContent = "Missing special character";
            return false;
        }

        error.textContent = "";
        return true;
    };

    // =========================
    // REVIEW BUTTON (ONLY ONE HANDLER)
    // =========================
    document.getElementById("reviewBtn").addEventListener("click", function (e) {
        e.preventDefault();

        const pwStatus = checkPasswords() ? "PASS" : "ERROR";
        const dobStatus = validateDOB() ? "PASS" : "ERROR";
        const phoneStatus = validatePhone() ? "PASS" : "ERROR";
        const emailStatus = validateEmail() ? "PASS" : "ERROR";

        // checkboxes FIXED IDS
        let prefs = [];
        if (document.getElementById("prefemail").checked) prefs.push("Email");
        if (document.getElementById("smstext").checked) prefs.push("SMS");
        if (document.getElementById("phonecall").checked) prefs.push("Phone");
        if (document.getElementById("voicemail").checked) prefs.push("Voicemail");
        if (document.getElementById("direct").checked) prefs.push("Direct");

        const zip = document.getElementById("zip").value;
        const zipDisplay = zip.length > 5 ? zip.substring(0, 5) : zip;

        const reviewHTML = `
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
            <td>${dobStatus}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>${email.value}</td>
            <td>${emailStatus}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>${phone.value}</td>
            <td>${phoneStatus}</td>
        </tr>

        <tr>
            <td><b>State</b></td>
            <td>${state.value}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Zip</b></td>
            <td>${zipDisplay}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Health</b></td>
            <td>${health.value}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Preferences</b></td>
            <td>${prefs.join(", ")}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Password</b></td>
            <td>******</td>
            <td>${pwStatus}</td>
        </tr>

        </table>
        `;

        document.getElementById("review").innerHTML = reviewHTML;
    });

});
