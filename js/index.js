const login = document.querySelector("#login");
const signup = document.querySelector("#signup");
const loginBtn = document.querySelector("#loginBtn");
const signupBtn = document.querySelector("#signupBtn");
const register = document.querySelector("#register");
const openLogInBtn = document.querySelector("#openLogIn");
const home = document.querySelector("#home");
const logout = document.querySelector("#logout");
const nameSignUpInput = document.querySelector("#NameSignUp");
const emailSignUpInput = document.querySelector("#emailSignUp");
const passwordSignUpInput = document.querySelector("#PasswordSignUp");
const emailLogInInput = document.querySelector("#emailLogIn");
const passwordLogInInput = document.querySelector("#PasswordLogIn");
const errorLogIn = document.querySelector("#errorLogIn");
const errorSignUp = document.querySelector("#errorSignUp");
const userName = document.querySelector("#userName");

const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

// Add User
signupBtn.addEventListener("click", function () {
    const name = nameSignUpInput.value.trim();
    const email = emailSignUpInput.value.trim();
    const password = passwordSignUpInput.value.trim();

    // Check if all inputs are filled
    if (!name || !email || !password) {
        errorSignUp.classList.replace("d-none", "d-block");
        errorSignUp.innerHTML = "All inputs are required";
        return;
    }

    // Check if email is already taken
    if (!isEmailValid(email)) {
        errorSignUp.classList.replace("d-none", "d-block");
        errorSignUp.innerHTML = "Email is already taken";
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password
    };
    allUsers.push(user);
    saveUserInLocalStorage();
    returnToLogIn();
    clear();
    errorDisplayNone();
});

// Open Sign Up
register.addEventListener("click", function () {
    login.classList.replace("d-block", "d-none");
    signup.classList.replace("d-none", "d-block");
});

// Save User in Local Storage
function saveUserInLocalStorage() {
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
}

// Open Home
loginBtn.addEventListener("click", function () {
    const email = emailLogInInput.value.trim();
    const password = passwordLogInInput.value.trim();
    var userFound = null;

    // Check if all inputs are filled
    if (!email || !password) {
        errorLogIn.classList.replace("d-none", "d-block");
        errorLogIn.innerHTML = "All inputs are required";
        return
    }

    // Find the user and save it in userFound
    for (let index = 0; index < allUsers.length; index++) {
        if (email === allUsers[index].email) {
            userFound = allUsers[index];
            break;
        }
    }

    // Check email
    if (userFound === null) {
        errorLogIn.classList.replace("d-none", "d-block");
        errorLogIn.innerHTML = "Email is incorrect";
        return;
    }

    // Check password
    if (password != userFound.password) {
        errorLogIn.classList.replace("d-none", "d-block");
        errorLogIn.innerHTML = "Password is incorrect";
        return;
    }

    home.classList.replace("d-none", "d-block");
    login.classList.replace("d-block", "d-none");
    clear();
    errorDisplayNone();
    userName.innerHTML = userFound.name;
});

// Open LogIn
function returnToLogIn() {
    login.classList.replace("d-none", "d-block");
    home.classList.replace("d-block", "d-none");
    signup.classList.replace("d-block", "d-none");
    clear();
    errorDisplayNone();
}
logout.addEventListener("click", returnToLogIn);
openLogInBtn.addEventListener("click", returnToLogIn);

// clear function
function clear() {
    emailLogInInput.value = "";
    passwordLogInInput.value = "";
    nameSignUpInput.value = "";
    emailSignUpInput.value = "";
    passwordSignUpInput.value = "";
}

// Remove error messages
function errorDisplayNone() {
    errorLogIn.classList.replace("d-block", "d-none");
    errorSignUp.classList.replace("d-block", "d-none");
}

// check if email is valid
function isEmailValid(email) {
    for (let index = 0; index < allUsers.length; index++) {
        if (allUsers[index].email == email) {
            return false;
        }
    }
    return true;
}