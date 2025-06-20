const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const register = document.querySelector("#register");
const openLogInBtn = document.querySelector("#openLogIn");
const home = document.querySelector("#home");
const logout = document.querySelector("#logout");

// Don’t have an account? Open Sign Up
function openRegister() {
    login.classList.replace("d-block", "d-none");
    signup.classList.replace("d-none", "d-block");
}
register.addEventListener("click", openRegister);

// Click on SignUpBtn | You have an account? Open Log In
function openLogIn() {
    login.classList.replace("d-none", "d-block");
    signup.classList.replace("d-block", "d-none");
}
signupBtn.addEventListener("click", openLogIn);
openLogInBtn.addEventListener("click", openLogIn);

// Click on LogInBtn
function ToggleLogInBtn() {
    home.classList.replace("d-none", "d-block");
    login.classList.replace("d-block", "d-none");
}
loginBtn.addEventListener("click", ToggleLogInBtn);

// Click on LogOut to Return to LogIn
function returnToLogIOn() {
    login.classList.replace("d-none", "d-block");
    home.classList.replace("d-block", "d-none");
}
logout.addEventListener("click", returnToLogIOn)