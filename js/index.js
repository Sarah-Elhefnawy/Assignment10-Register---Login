const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const register = document.querySelector("#register");
const openLogInBtn = document.querySelector("#openLogIn");

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
    login.classList.replace("d-block", "d-none");
}
loginBtn.addEventListener("click", ToggleLogInBtn);

