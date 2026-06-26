document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("reviewBtn").addEventListener("click", function () {
//Health Slider
function updateSlider() {
    const slider = document.getElementById("health");
    const display = document.getElementById("rangedisplay");
    display.textContent = slider.value;
}


//DOB Validation
function validateDOB() {
    const dob = document.getElementById("dob");
    const error = document.getElementById("dob_error");

    const today = new Date();
    const dobDate = new Date(dob.value);

    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (!dob.value) {
        error.textContent = "DOB is required";
        return false;
    }

    if (dobDate > today) {
        error.textContent = "ERROR: DOB cannot be in the future";
        return false;
    }

    if (dobDate < minDate) {
        error.textContent = "ERROR: DOB cannot be more than 120 years ago";
        return false;
    }

    error.textContent = "";
    return true;
}


//Phone Validation
function validatePhone() {
    const phone = document.getElementById("phone");
    const error = document.getElementById("phone_error");

    const pattern = /^\d{3}-\d{3}-\d{4}$/;

    if (!pattern.test(phone.value)) {
        error.textContent = "ERROR: Invalid phone format";
        return false;
    }

    error.textContent = "";
    return true;
}


//Email Validation
function validateEmail() {
    const email = document.getElementById("email");
    const error = document.getElementById("email_error");

    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (!pattern.test(email.value)) {
        error.textContent = "ERROR: Invalid email format";
        return false;
    }

    error.textContent = "";
    return true;
}


//Password Validation
function checkPasswords() {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmpassword").value;
    const userid = document.getElementById("userid").value;
    const error = document.getElementById("password_error");

    const special = /[!@#$%^&*()_\-+=]/;

    if (password !== confirm) {
        error.textContent = "ERROR: Passwords do not match";
        return false;
    }

    if (password.includes(userid) && userid !== "") {
        error.textContent = "ERROR: Password cannot contain User ID";
        return false;
    }

    if (!special.test(password)) {
        error.textContent = "ERROR: Must contain special character";
        return false;
    }

    error.textContent = "";
    return true;
}


//Review Button
document.getElementById("reviewBtn").addEventListener("click", function () {

    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmpassword").value;
    const userid = document.getElementById("userid").value;

    let passwordStatus = checkPasswords() ? "PASS" : "ERROR";

    // checkbox values
    let prefs = [];
    if (document.getElementById("pref_email").checked) prefs.push("Email");
    if (document.getElementById("pref_sms").checked) prefs.push("SMS");
    if (document.getElementById("pref_phone").checked) prefs.push("Phone");
    if (document.getElementById("pref_voicemail").checked) prefs.push("Voicemail");

    // radio values
    const gender =
        document.querySelector('input[name="gender"]:checked')?.value || "Not selected";

    // DOB validation
    const dobValid = validateDOB() ? "PASS" : "ERROR";

    // phone/email validation
    const phoneValid = validatePhone() ? "PASS" : "ERROR";
    const emailValid = validateEmail() ? "PASS" : "ERROR";

    // ZIP truncation display
    let zip = document.getElementById("zip").value;
    let zipDisplay = zip.length > 5 ? zip.substring(0,5) : zip;

    const reviewHTML = `
        <h2>PLEASE REVIEW THIS INFORMATION</h2>

        <table border="1" style="width:100%; border-collapse: collapse;">

        <tr>
            <td><b>Name</b></td>
            <td>${document.getElementById("firstname").value}
                ${document.getElementById("middleinit").value}
                ${document.getElementById("lastname").value}
            </td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>DOB</b></td>
            <td>${document.getElementById("dob").value}</td>
            <td>${dobValid}</td>
        </tr>

        <tr>
            <td><b>Email</b></td>
            <td>${document.getElementById("email").value}</td>
            <td>${emailValid}</td>
        </tr>

        <tr>
            <td><b>Phone</b></td>
            <td>${document.getElementById("phone").value}</td>
            <td>${phoneValid}</td>
        </tr>

        <tr>
            <td><b>Address</b></td>
            <td>
                ${document.getElementById("addr1").value}<br>
                ${document.getElementById("addr2").value}<br>
                ${document.getElementById("city").value},
                ${document.getElementById("state").value}
                ${zipDisplay}
            </td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Gender</b></td>
            <td>${gender}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Contact Preferences</b></td>
            <td>${prefs.join(", ")}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Health Rating</b></td>
            <td>${document.getElementById("health").value}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>User ID</b></td>
            <td>${userid}</td>
            <td>PASS</td>
        </tr>

        <tr>
            <td><b>Password</b></td>
            <td>********</td>
            <td>${passwordStatus}</td>
        </tr>

        <tr>
            <td><b>Symptoms</b></td>
            <td>${document.getElementById("symptoms").value}</td>
            <td>PASS</td>
        </tr>

        </table>
    `;

    document.getElementById("review").innerHTML = reviewHTML;
});


// Reset Cleanup
document.querySelector("form").addEventListener("reset", function () {

    document.getElementById("review").innerHTML = "";

    document.getElementById("rangedisplay").textContent = "5";

    document.getElementById("password_error").textContent = "";
    document.getElementById("phone_error").textContent = "";
    document.getElementById("email_error").textContent = "";
    document.getElementById("dob_error").textContent = "";
    
    });

});
