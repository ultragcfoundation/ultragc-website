/* ============================
   SIMPLE LOCAL LOGIN SYSTEM
   ============================ */

/* YOUR ADMIN CREDENTIALS */
const ADMIN_USERNAME = "ultragcadmin";

// Password “foundation2025” hashed
const ADMIN_PASSWORD_HASH = "1868d856b5b86bee55b3d27a55993f2c";

/* MD5 HASH FUNCTION */
function md5(str){
    return CryptoJS.MD5(str).toString();
}

function login(){
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const hash = md5(pass);

    if(user === ADMIN_USERNAME && hash === ADMIN_PASSWORD_HASH){
        localStorage.setItem("ultragc_admin_logged", "yes");
        window.location.href = "index.html";
    } else {
        document.getElementById("error").textContent = "Invalid username or password.";
    }
}

/* REDIRECT IF NOT LOGGED IN */
function requireLogin(){
    if(localStorage.getItem("ultragc_admin_logged") !== "yes"){
        window.location.href = "login.html";
    }
}

function logout(){
    localStorage.removeItem("ultragc_admin_logged");
    window.location.href = "login.html";
}
